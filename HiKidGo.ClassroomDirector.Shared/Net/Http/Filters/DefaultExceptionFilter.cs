using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using System;

namespace HiKidGo.ClassroomDirector.Net.Http.Filters
{
    public class DefaultExceptionFilterAttribute : ExceptionFilterAttribute
    {
        private readonly ILogger _log;

        public DefaultExceptionFilterAttribute(ILoggerFactory loggerFactory)
        {
            _log = loggerFactory.CreateLogger<DefaultExceptionFilterAttribute>();
        }

        public override void OnException(ExceptionContext context)
        {
            string trackingUniqueId = context.HttpContext.Request.Headers.GetTrackingUniqueId();
            string clientTrackingUniqueId = context.HttpContext.Request.Headers.GetClientTrackingUniqueId();
            Exception ex = context.Exception;

            using (_log.BeginApiScope(context.HttpContext))
            {
                do
                {
                    _log.LogError(ex, ex.Message);
                    ex = ex.InnerException;
                }
                while (ex != null);
            }

            string msg = $"Sorry, an unexpected error has occured. Please try again. If you continue to receive this message please email support. [Tracking: {trackingUniqueId}]";

            context.HttpContext.Response.StatusCode = 500;
            context.Result = new JsonResult(new
            {
                Message = msg,
                TrackingUniqueId = trackingUniqueId,
                ClientTrackingUniqueId = clientTrackingUniqueId
            });
        }
    }
}
