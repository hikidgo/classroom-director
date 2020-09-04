using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HiKidGo.ClassroomDirector.Net.Http
{
    public static class LoggerScopeExtensions
    {
        public static IDisposable BeginApiScope(this ILogger log, HttpContext context)
        {
            return log.BeginScope(log.GetState(context));
        }

        public static IEnumerable<KeyValuePair<string, object>> GetState(this ILogger log, HttpContext context)
        {
            string ipAddress = context.Connection.RemoteIpAddress.ToString();
            string trackingUniqueId = context.Request.Headers.GetTrackingUniqueId();
            string clientTrackingUniqueId = context.Request.Headers.GetClientTrackingUniqueId();
            string userName = context.User?.Identity?.Name;

            return new[] {
                    new KeyValuePair<string, object>("ipAddress", ipAddress),
                    new KeyValuePair<string, object>("trackingUniqueId", trackingUniqueId),
                    new KeyValuePair<string, object>("clientTrackingUniqueId", clientTrackingUniqueId),
                    new KeyValuePair<string, object>("userName", userName)
                }.AsEnumerable();
        }
    }
}
