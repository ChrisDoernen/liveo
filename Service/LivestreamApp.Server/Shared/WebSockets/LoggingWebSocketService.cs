using LivestreamApp.Server.Shared.Logging;
using LivestreamApp.Server.Streaming.Processes;
using Ninject.Extensions.Logging;
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

        private void SendLine(object sender, MessageReceivedEventArgs e)
        {
            Sessions?.Broadcast(e.Message);
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
