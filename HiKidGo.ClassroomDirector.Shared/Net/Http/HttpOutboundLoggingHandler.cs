using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.DataProtection;

namespace HiKidGo.ClassroomDirector.Net.Http
{
    public class HttpOutboundLoggingHandler : DelegatingHandler
    {
        private const int _CONTENT_TOO_LARGE = 10000;
        private readonly string[] _LOGGABLE_CONTENT_TYPES = new string[4] { "application/problem+json", "application/json", "application/xml", "text/xml" };
        private readonly ILogger<HttpOutboundLoggingHandler> _logger;
        private readonly IHttpCryptographyProvider _httpCryptographyProvider;
        private readonly IHttpMaskProvider _httpMaskProvider;

        public HttpOutboundLoggingHandler(ILogger<HttpOutboundLoggingHandler> logger, IHttpCryptographyProvider httpCryptographyProvider, IHttpMaskProvider httpMaskProvider)
        {
            _logger = logger;
            _httpCryptographyProvider = httpCryptographyProvider;
            _httpMaskProvider = httpMaskProvider;
        }

        protected async override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            string userName = null;
            string trackingUniqueId = null;
            string clientTrackingUniqueId = null;
            string reqHeader = null;
            string reqMethod = null;
            string reqContent = null;
            string reqUrl = null;
            string reqPathAndQuery = null;
            Exception e = null;

            string respHeader = null;
            string respContent = null;
            int? respStatus = null;
            string ipAddress = null;
            string reqContentType = "";
            string respContentType = "";
            long reqContentLength = 0;
            long respContentLength = 0;
            IEnumerable<string> contentTypes;
            IEnumerable<string> contentLengths;
            try
            {
                if (request.Headers.TryGetValues("Content-Type", out contentTypes))
                {
                    reqContentType = contentTypes.First();
                }
                if (request.Headers.TryGetValues("Content-Length", out contentLengths))
                {
                    reqContentLength = long.Parse(contentLengths.First());
                }

                trackingUniqueId = request.Headers.GetTrackingUniqueId();
                clientTrackingUniqueId = request.Headers.GetClientTrackingUniqueId();

                reqHeader = ToString(request.Headers);
                reqMethod = request.Method.ToString();
                reqUrl = request.RequestUri.ToString();
                reqPathAndQuery = request.RequestUri.PathAndQuery;

                if (request.Content != null)
                {
                    reqContentType = request.Content.Headers.ContentType?.MediaType ?? reqContentType;
                    reqContentLength = request.Content.Headers.ContentLength.HasValue ? request.Content.Headers.ContentLength.Value : reqContentLength;
                    reqHeader = ToString(request.Content.Headers);

                    if (!string.IsNullOrWhiteSpace(reqContentType) &&
                        _LOGGABLE_CONTENT_TYPES.Count(x => reqContentType.StartsWith(x)) > 0 &&
                       reqContentLength <= _CONTENT_TOO_LARGE)
                    {
                        reqContent = await request.Content.ReadAsStringAsync();
                    }
                }

                var resp = await base.SendAsync(request, cancellationToken);

                respHeader = ToString(resp.Headers);

                if (resp.Headers.TryGetValues("Content-Type", out contentTypes))
                {
                    respContentType = contentTypes.First();
                }
                if (resp.Headers.TryGetValues("Content-Length", out contentLengths))
                {
                    respContentLength = long.Parse(contentLengths.First());
                }

                if (resp.Content != null)
                {
                    respContentType = resp.Content.Headers.ContentType?.MediaType ?? respContentType;
                    respContentLength = resp.Content.Headers.ContentLength.HasValue ? resp.Content.Headers.ContentLength.Value : respContentLength;
                    respHeader = ToString(resp.Content.Headers);
                    if (_LOGGABLE_CONTENT_TYPES.Count(x => respContentType.StartsWith(x)) > 0 &&
                        respContentLength <= _CONTENT_TOO_LARGE)
                    {
                        respContent = await resp.Content.ReadAsStringAsync();
                    }
                }

                respStatus = (int)resp.StatusCode;

                return resp;
            }
            catch (Exception ex)
            {
                e = ex;
                throw;
            }
            finally
            {
                reqHeader = Encrypt(reqHeader);
                reqContent = Encrypt(Mask(reqContent, reqContentType));
                respHeader = Encrypt(respHeader);
                respContent = Encrypt(Mask(respContent, reqContentType));

                var state = new[] {
                    new KeyValuePair<string, object>("ipAddress", ipAddress),
                    new KeyValuePair<string, object>("trackingUniqueId", trackingUniqueId),
                    new KeyValuePair<string, object>("clientTrackingUniqueId", clientTrackingUniqueId),
                    new KeyValuePair<string, object>("userName", userName),
                    new KeyValuePair<string, object>("url", reqUrl),
                    new KeyValuePair<string, object>("pathAndQuery", reqPathAndQuery),
                    new KeyValuePair<string, object>("requestHeader", reqHeader),
                    new KeyValuePair<string, object>("requestContent", reqContent),
                    new KeyValuePair<string, object>("requestContentLength", reqContentLength),
                    new KeyValuePair<string, object>("requestMethod", reqMethod),
                    new KeyValuePair<string, object>("responseHeader", respHeader),
                    new KeyValuePair<string, object>("responseContent", respContent),
                    new KeyValuePair<string, object>("responseStatusCode", respStatus),
                    new KeyValuePair<string, object>("responseContentLength", respContentLength)
                }.AsEnumerable();

                using (_logger.BeginScope(state))
                {
                    _logger.LogInformation(e?.Message ?? "");
                }
            }
        }

        protected string Encrypt(string str)
        {
            if (string.IsNullOrWhiteSpace(str))
                return null;

            if (_httpCryptographyProvider == null)
                return str;

            var svcCrypto = _httpCryptographyProvider.Create();

            if (svcCrypto == null)
                return str;

            return svcCrypto.Protect(str);
        }

        protected string Mask(string str, string contentType)
        {
            if (string.IsNullOrWhiteSpace(str))
                return null;

            if (_httpMaskProvider == null)
                return str;

            var svcMask = _httpMaskProvider.Create();

            if (svcMask == null)
                return str;

            return svcMask.MaskBody(str, contentType);
        }

        protected string ToString(HttpHeaders headers)
        {
            var svcMask = _httpMaskProvider?.Create();

            string[] values = headers
                .Select(x =>
                {
                    string val = null;
                    if (x.Value != null)
                    {
                        val = "[" + string.Join(',', x.Value) + "]";
                    }
                    else
                    {
                        val = "[]";
                    }

                    if (svcMask != null)
                    {
                        val = svcMask.MaskHeader(x.Key, val);
                    }

                    return $"{x.Key}:{val}";

                })
                .ToArray();

            return string.Join(Environment.NewLine, values);
        }

    }
}
