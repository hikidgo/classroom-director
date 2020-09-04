using Microsoft.AspNetCore.Builder;
using System;
using System.Collections.Generic;
using System.Text;

namespace HiKidGo.ClassroomDirector.Net.Http
{
    public static class HttpLoggingMiddlewareExtensions
    {
        public static IApplicationBuilder UseHttpLogging(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<HttpLoggingMiddleware>();
        }
    }
}
