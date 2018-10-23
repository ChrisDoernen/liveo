using LivestreamApp.Server.Shared.Logging;
using LivestreamApp.Server.Streaming.StreamingSources;
using LivestreamApp.Shared.Network;
using Ninject.Extensions.Logging;
using System;
using WebSocketSharp.Server;

namespace LivestreamApp.Server.Shared.WebSockets
{
    public class WebSocketServerAdapter : IWebSocketServerAdapter, IDisposable
    {
        private readonly ILogger _logger;
        private WebSocketServer _webSocketServer;
        private readonly INetworkConfiguration _networkConfiguration;
        private readonly IWebSocketServiceFactory _webSocketServiceFactory;

        public WebSocketServerAdapter(ILogger logger, INetworkConfiguration networkConfiguration,
            IWebSocketServiceFactory webSocketServiceFactory)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _webSocketServiceFactory = webSocketServiceFactory ?? throw new ArgumentNullException(nameof(webSocketServiceFactory));
            _networkConfiguration = networkConfiguration ?? throw new ArgumentNullException(nameof(networkConfiguration));
            StartWebSocketServer();
        }

        public void StartWebSocketServer()
        {
            try
            {
                var webSocketServerIp = _networkConfiguration.IpAddress;
                var webSocketServerPort = _networkConfiguration.WebSocketServerPort;
                var webSocketServerUri = _networkConfiguration.WebSocketServerUri;
                _webSocketServer = new WebSocketServer(webSocketServerIp, webSocketServerPort);
                _webSocketServer.Start();
                _logger.Info($"WebSocket server started, listening on {webSocketServerUri}.");
            }
            catch (Exception ex)
            {
                _logger.Error("Starting WebSocket server failed.");
                _logger.Error(ex.ToString());
            }
        }

        public async void StopWebSocketServer()
        {
            try
            {
                await _webSocketServer.Stop();
                _logger.Info("WebSocket server stopped.");
            }
            catch (Exception ex)
            {
                _logger.Error("Stopping WebSocket server failed.");
                _logger.Error(ex.ToString());
            }
        }

        public void AddStreamingWebSocketService(string path, IStreamingSource source)
        {
            _webSocketServer.AddWebSocketService(path, () =>
                _webSocketServiceFactory.GetStreamingWebSocketervice(source));
            _logger.Debug($"Added streaming service on path {path}.");
        }

        public void AddLoggingWebSocketService(string path, ILoggingSource source)
        {
            _webSocketServer.AddWebSocketService(path, () =>
                _webSocketServiceFactory.GetLoggingWebSocketervice(source));
            _logger.Debug($"Added streaming service on path {path}.");
        }

        public void RemoveWebSocketService(string path)
        {
            _webSocketServer.RemoveWebSocketService(path);
            _logger.Debug($"Removed streaming service on path {path}.");
        }

        public void Dispose()
        {
            StopWebSocketServer();
            _logger.Debug("WebSocketServerAdapter disposed.");

        }
    }
}
