using System;
using System.Configuration;
using Nancy.Hosting.Self;

namespace LivestreamService.Service.AppConfiguration
{
    public class Nancy
    {
        public static NancyHost GetHost()
        {
            var defaultPort = ConfigurationManager.AppSettings["DefaultPort"];

            var hostConfiguration = new HostConfiguration
            {
                UrlReservations = new UrlReservations { CreateAutomatically = true }
            };

            var uri = new Uri($"http://localhost:{defaultPort}");
            var nancyHost = new NancyHost(hostConfiguration, uri);
            return nancyHost;
        }
    }
}
