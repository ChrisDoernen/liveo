using LivestreamApp.Shared.AppSettings;
using System;
using System.Net;

namespace LivestreamApp.Shared.Network
{
    /// <inheritdoc />
    public class NetworkConfiguration : INetworkConfiguration
    {
        /// <inheritdoc />
        public IPHostEntry HostEntry { get; private set; }

        /// <inheritdoc />
        public IPAddress IpAddress { get; private set; }

        /// <inheritdoc />
        public string WebServerUri { get; private set; }

        /// <inheritdoc />
        public int WebSocketServerPort { get; private set; }

        /// <inheritdoc />
        public string WebSocketServerUri { get; private set; }

        private readonly IAppSettingsProvider _appSettingsProvider;
        private readonly INetworkUtilities _networkUtilities;
        private const string WebSocketScheme = "ws";
        private const string HttpScheme = "http";
        private const string Localhost = "localhost";

        public NetworkConfiguration(IAppSettingsProvider appSettingsProvider, INetworkUtilities networkUtilities)
        {
            _appSettingsProvider = appSettingsProvider ?? throw new ArgumentNullException(nameof(appSettingsProvider));
            _networkUtilities = networkUtilities ?? throw new ArgumentNullException(nameof(networkUtilities));
            Initialize();
        }

        private void Initialize()
        {
            // The order of the calls matters.
            GetHostName();
            GetLocalIpAddress();
            GetWebSocketServerPort();
            GetWebServerUri();
            GetWebSocketServerUri();
        }

        private void GetHostName()
        {
            HostEntry = _networkUtilities.GetHostName();
        }

        private void GetWebServerUri()
        {
            var httpPort = _appSettingsProvider.GetIntValue(AppSetting.DefaultPort);
            WebServerUri = GetUri(HttpScheme, Localhost, httpPort);
        }

        private void GetWebSocketServerPort()
        {
            WebSocketServerPort = _appSettingsProvider.GetIntValue(AppSetting.DefaultWebSocketPort);
        }

        private void GetWebSocketServerUri()
        {
            var webSocketServerPort = _appSettingsProvider.GetIntValue(AppSetting.DefaultWebSocketPort);
            WebSocketServerUri = GetUri(WebSocketScheme, Localhost, webSocketServerPort);
        }

        private string GetUri(string scheme, string domain, int port)
        {
            return new UriBuilder(scheme, domain, port).ToString();
        }

        private void GetLocalIpAddress()
        {
            IpAddress = _networkUtilities.GetIpAddress();
        }
    }
}
