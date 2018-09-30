using Ninject.Extensions.Logging;
using System.Diagnostics;
using LivestreamApp.Server.Shared.Logging;
using WebSocketSharp;
using WebSocketSharp.Server;

namespace LivestreamApp.Server.Shared.WebSockets
{
    public class LoggingWebSocketService : WebSocketBehavior
    {
        private readonly ILoggingSource _source;
        private readonly ILogger _logger;

        public LoggingWebSocketService(ILogger logger, ILoggingSource source)
        {
            _logger = logger;
            _source = source;
            IgnoreExtensions = true;
        }

        private void SendLine(object sender, DataReceivedEventArgs e)
        {
            Sessions?.Broadcast(e.Data);
        }

        protected override void OnOpen()
        {
            _source.LogLineReceived += SendLine;
        }

        protected override void OnClose(CloseEventArgs e)
        {
            _source.LogLineReceived -= SendLine;
        }

        protected override void OnError(ErrorEventArgs e)
        {
            _logger.Warn($"WebSocket service error: {e}");
        }
    }
}
