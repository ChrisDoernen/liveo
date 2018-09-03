using LivestreamApp.Shared;
using Nancy.Hosting.Self;
using System;

namespace LivestreamApp.Service.Startup
{
    public class NancyStartup
    {
        private readonly IAppSettingsProvider _appSettingsProvider;

        public NancyStartup(IAppSettingsProvider appSettingsProvider)
        {
            _appSettingsProvider = appSettingsProvider;
        }

        public NancyHost GetHost()
        {
            var defaultPort = _appSettingsProvider.GetIntValue(AppSetting.DefaultPort);

            var hostConfiguration = new HostConfiguration
            {
                UrlReservations = new UrlReservations { CreateAutomatically = true }
            };

            var uri = new Uri($"http://localhost:{defaultPort.ToString()}");
            var nancyHost = new NancyHost(hostConfiguration, uri);
            return nancyHost;
        }
    }
}
