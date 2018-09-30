using LivestreamApp.Server.Shared.Logging;
using LivestreamApp.Server.Streaming.StreamingSources;
using LivestreamApp.Shared.Network;
using Ninject.Extensions.Logging;
using System;
using WebSocketSharp.Server;

namespace LivestreamApp.Server.Shared.WebSockets
{
    public class WebSocketServerAdapter : IWebSocketServerAdapter
    {
        private readonly ILogger _logger;
        private WebSocketServer _webSocketServer;
        private readonly IUriConfiguration _uriConfiguration;
        private readonly IWebSocketServiceFactory _webSocketServiceFactory;

        public WebSocketServerAdapter(ILogger logger, IUriConfiguration uriConfiguration,
            IWebSocketServiceFactory webSocketServiceFactory)
        {
            _logger = logger;
            _webSocketServiceFactory = webSocketServiceFactory;
            _uriConfiguration = uriConfiguration;
        }

        public void StartWebSocketServer()
        {
            try
            {
                var wsUri = _uriConfiguration.GetWsUri();
                _webSocketServer = new WebSocketServer(wsUri);
                _webSocketServer.Start();
                _logger.Info($"WebSocket server started, istening on {wsUri}.");
            }
            catch (Exception ex)
            {
                _logger.Error("Starting WebSocket server failed.");
                _logger.Error(ex.ToString());
            }
        }

        public void StopWebSocketServer()
        {
            try
            {
                _webSocketServer.Stop();
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
            var service = _webSocketServiceFactory.GetStreamingWebSocketervice(source);
            _webSocketServer.AddWebSocketService(path, () => service);
            _logger.Info($"Added streaming service on path {path}.");
        }

        public void AddLogginggWebSocketService(string path, ILoggingSource source)
        {
            var service = _webSocketServiceFactory.GetLoggingWebSocketervice(source);
            _webSocketServer.AddWebSocketService(path, () => service);
            _logger.Info($"Added streaming service on path {path}.");
        }

        public void RemoveWebSocketService(string path)
        {
            _webSocketServer.RemoveWebSocketService(path);
            _logger.Info($"Removed streaming service on path {path}.");
        }
    }
}
