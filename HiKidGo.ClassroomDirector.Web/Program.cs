using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using NLog.Extensions.Logging;

namespace HiKidGo.ClassroomDirector.Web
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args)
                .Build()
                .Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args)
        {

            string envConfigFile = Path.Combine(Directory.GetCurrentDirectory(), "appsettings.json");
            var json = File.ReadAllText(envConfigFile, Encoding.UTF8);
            var envVars = Environment.GetEnvironmentVariables();
            foreach (var x in envVars.Keys)
            {
                if (x is string)
                {
                    json = json.Replace($"%{x}%", HttpUtility.JavaScriptStringEncode(envVars[x]?.ToString()));
                }
            }

            var configBytes = Encoding.UTF8.GetBytes(json);

            var config = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonStream(new MemoryStream(configBytes, false));

            var finalConfig = config.Build();

            return Host.CreateDefaultBuilder(args)
                .ConfigureAppConfiguration(builder => builder.AddConfiguration(finalConfig))
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                })
                  .ConfigureLogging((hostContext, builder) =>
                  {
                      var env = hostContext.HostingEnvironment;
                      var options = new NLogProviderOptions
                      {
                          CaptureMessageTemplates = true,
                          CaptureMessageProperties = true
                      };
                      builder.SetMinimumLevel(LogLevel.Trace);
                      //if (env.IsDevelopment())
                      //{
                      //    var xmlConfig = new XmlLoggingConfiguration("nlog.Development.config");
                      //    builder.AddNLog(xmlConfig, options);
                      //}
                      //else
                      builder.AddNLog(options);
                  });

        }
    }
}
