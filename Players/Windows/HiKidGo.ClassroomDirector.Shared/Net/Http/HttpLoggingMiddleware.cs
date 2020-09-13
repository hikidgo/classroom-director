using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HiKidGo.ClassroomDirector.Net.Http
{
    public class HttpLoggingMiddleware
    {
        private const int _CONTENT_TOO_LARGE = 10000;
        private readonly string[] _LOGGABLE_CONTENT_TYPES = new string[4] { "application/problem+json", "application/json", "application/xml", "text/xml" };
        private readonly RequestDelegate _next;
        private readonly ILogger<HttpLoggingMiddleware> _logger;
        private readonly IHttpCryptographyProvider _httpCryptographyProvider;
        private readonly IHttpMaskProvider _httpMaskProvider;

        public HttpLoggingMiddleware(RequestDelegate next, ILogger<HttpLoggingMiddleware> logger, IHttpCryptographyProvider httpCryptographyProvider, IHttpMaskProvider httpMaskProvider)
        {
            _next = next;
            _logger = logger;
            _httpCryptographyProvider = httpCryptographyProvider;
            _httpMaskProvider = httpMaskProvider;
        }

        public async Task Invoke(HttpContext context)
        {
            string userName = null;
            string trackingUniqueId = null;
            string clientTrackingUniqueId = null;
            string reqHeader = null;
            string reqMethod = null;
            string reqContent = null;
            string reqUrl = null;
            string reqPathAndQuery = null;
            long reqContentLength = 0;
            long respContentLength = 0;
            Exception e = null;

            string respHeader = null;
            string respContent = null;
            int? respStatus = null;
            string ipAddress = null;
            string reqContentType = "";

            try
            {
                var request = context.Request;
                reqContentType = request?.ContentType?.ToLower() ?? "";

                trackingUniqueId = request.Headers.GetTrackingUniqueId();
                clientTrackingUniqueId = request.Headers.GetClientTrackingUniqueId();
                reqHeader = ToString(request.Headers);
                reqMethod = request.Method;
                reqUrl = request.GetDisplayUrl();
                reqPathAndQuery = (request.Path.HasValue ? request.Path.Value : "")
                    + (request.QueryString.HasValue ? request.QueryString.Value : "");
                ipAddress = context.Connection.RemoteIpAddress.ToString();
                reqContentLength = request.ContentLength.HasValue ? request.ContentLength.Value : 0;

                reqContent = null;
                if (request.Body != null)
                {
                    request.EnableBuffering();
                    var sRequestBody = request.Body;
                    if (_LOGGABLE_CONTENT_TYPES.Count(x => reqContentType.StartsWith(x)) > 0 && sRequestBody.Length <= _CONTENT_TOO_LARGE)
                    {
                        var reader = new StreamReader(sRequestBody, Encoding.UTF8);
                        reqContent = await reader.ReadToEndAsync();
                        sRequestBody.Seek(0, SeekOrigin.Begin);
                    }
                    request.Body = sRequestBody;
                }

                var resp = context.Response;
                using (var sResponseBody = new MemoryStream())
                {
                    var orgRespBody = resp.Body;
                    resp.Body = sResponseBody;

                    await _next(context);

                    respContentLength = resp.ContentLength.HasValue ? resp.ContentLength.Value : 0;
                    sResponseBody.Seek(0, SeekOrigin.Begin);

                    var respContentType = context.Response?.ContentType?.ToLower() ?? "";
                    if (respContentLength != 0 &&
                        !string.IsNullOrWhiteSpace(respContentType) &&
                        _LOGGABLE_CONTENT_TYPES.Count(x => respContentType.StartsWith(x)) > 0 &&
                        sResponseBody.Length <= _CONTENT_TOO_LARGE)
                    {
                        var reader = new StreamReader(sResponseBody, Encoding.UTF8);
                        respContent = await reader.ReadToEndAsync();
                        sResponseBody.Seek(0, SeekOrigin.Begin);
                    }

                    await sResponseBody.CopyToAsync(orgRespBody);

                    resp.Body = orgRespBody;
                }

                userName = context.User?.Identity?.Name;
                respHeader = ToString(resp.Headers);
                respStatus = resp.StatusCode;
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

        protected string ToString(IHeaderDictionary headers)
        {
            var svcMask = _httpMaskProvider?.Create();

            string[] values = headers
                .Select(x =>
                {
                    string val = "[" + string.Join(',', x.Value) + "]";

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
