using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Primitives;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace HiKidGo.ClassroomDirector.Net.Http
{

    public static class HeadersExtensions
    {
        private const string _X_TRACKING_UNIQUEID = "X-Tracking-UniqueId";
        private const string _X_CLIENT_TRACKING_UNIQUEID = "X-Client-Tracking-UniqueId";


        public static string GetTrackingUniqueId(this IHeaderDictionary headers)
        {
            string trackingUniqueId = null;

            var header = headers.Where(x => x.Key == _X_TRACKING_UNIQUEID).FirstOrDefault();

            var str = header.Value.FirstOrDefault();

            if (!string.IsNullOrWhiteSpace(str))
                trackingUniqueId = str;

            if (trackingUniqueId == null)
            {
                trackingUniqueId = Guid.NewGuid().ToString();
                headers.Add(_X_TRACKING_UNIQUEID, new StringValues(trackingUniqueId));
            }

            return trackingUniqueId;
        }

        public static string GetClientTrackingUniqueId(this IHeaderDictionary headers)
        {
            string clientTrackingUniqueId = null;

            var header = headers.Where(x => x.Key == _X_CLIENT_TRACKING_UNIQUEID).FirstOrDefault();

            var str = header.Value.FirstOrDefault();

            if (!string.IsNullOrWhiteSpace(str))
                clientTrackingUniqueId = str;

            return clientTrackingUniqueId;
        }
        public static string GetTrackingUniqueId(this HttpHeaders headers)
        {
            string trackingUniqueId = null;
            if (headers.Contains(_X_TRACKING_UNIQUEID))
            {
                var str = headers.GetValues(_X_TRACKING_UNIQUEID)
                    .FirstOrDefault();
                if (!string.IsNullOrWhiteSpace(str))
                    trackingUniqueId = str;
            }

            if (trackingUniqueId == null)
            {
                trackingUniqueId = Guid.NewGuid().ToString();
                headers.Add(_X_TRACKING_UNIQUEID, trackingUniqueId);
            }

            return trackingUniqueId;
        }

        public static string GetClientTrackingUniqueId(this HttpHeaders headers)
        {
            string clientTrackingUniqueId = null;

            if (headers.Contains(_X_CLIENT_TRACKING_UNIQUEID))
            {
                var str = headers.GetValues(_X_CLIENT_TRACKING_UNIQUEID)
                    .FirstOrDefault();
                if (!string.IsNullOrWhiteSpace(str))
                    clientTrackingUniqueId = str;
            }

            return clientTrackingUniqueId;
        }

        public static string GetTrackingUniqueId(this ICollection<KeyValuePair<string, StringValues>> headers)
        {
            string trackingUniqueId = null;

            var header = headers.Where(x => x.Key == _X_TRACKING_UNIQUEID).FirstOrDefault();

            var str = header.Value.FirstOrDefault();

            if (!string.IsNullOrWhiteSpace(str))
                trackingUniqueId = str;

            if (trackingUniqueId == null)
            {
                trackingUniqueId = Guid.NewGuid().ToString();
                headers.Add(new KeyValuePair<string, StringValues>(_X_TRACKING_UNIQUEID, new StringValues(trackingUniqueId)));
            }

            return trackingUniqueId;
        }

        public static string GetClientTrackingUniqueId(this ICollection<KeyValuePair<string, StringValues>> headers)
        {
            string clientTrackingUniqueId = null;

            var header = headers.Where(x => x.Key == _X_CLIENT_TRACKING_UNIQUEID).FirstOrDefault();

            var str = header.Value.FirstOrDefault();

            if (!string.IsNullOrWhiteSpace(str))
                clientTrackingUniqueId = str;

            return clientTrackingUniqueId;
        }

    }
}
