using LivestreamApp.Shared.AppSettings;
using System;

namespace LivestreamApp.Shared.Network
{
    public class UriConfiguration : IUriConfiguration
    {
        private readonly IAppSettingsProvider _appSettingsProvider;
        private const string WsScheme = "ws";
        private const string HttpScheme = "http";
        private const string Domain = "localhost";

        public UriConfiguration(IAppSettingsProvider appSettingsProvider)
        {
            _appSettingsProvider = appSettingsProvider;
        }

        public string GetHttpUri()
        {
            var httpPort = _appSettingsProvider.GetIntValue(AppSetting.DefaultPort);
            return GetUri(HttpScheme, Domain, httpPort);
        }

        public string GetWsUri()
        {
            var wsPort = _appSettingsProvider.GetIntValue(AppSetting.DefaultWebSocketPort);
            return GetUri(WsScheme, Domain, wsPort);
        }

        private string GetUri(string scheme, string domain, int port)
        {
            return new UriBuilder(scheme, domain, port).ToString();
        }
    }
}
