using Microsoft.Extensions.DependencyInjection;
using HiKidGo.ClassroomDirector.Caching;
using HiKidGo.ClassroomDirector.Net.Http;
using HiKidGo.ClassroomDirector.Sys;

namespace HiKidGo.ClassroomDirector.Web
{
    public static class ServiceCollectionExtensions
    {

        public static IServiceCollection AddHttpLogging(this IServiceCollection services, IHttpCryptographyProvider httpCryptographyProvider, IHttpMaskProvider httpMaskProvider)
        {
            services.AddTransient<HttpOutboundLoggingHandler>();
            services.AddSingleton<IHttpCryptographyProvider>(httpCryptographyProvider);
            services.AddSingleton<IHttpMaskProvider>(httpMaskProvider);
            services.AddHttpClient("default")
                .AddHttpMessageHandler<HttpOutboundLoggingHandler>();

            return services;
        }
    }
}
