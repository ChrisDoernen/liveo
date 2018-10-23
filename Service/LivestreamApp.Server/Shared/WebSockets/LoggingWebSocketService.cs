using LivestreamApp.Server.Shared.Logging;
using LivestreamApp.Server.Shared.Processes;
using Ninject.Extensions.Logging;
using System;
using System.Threading.Tasks;
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
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _source = source ?? throw new ArgumentNullException(nameof(source));
        }

        private void SendLine(object sender, MessageReceivedEventArgs e)
        {
            Send(e.Message);
        }

        protected override async Task OnOpen()
        {
            _source.LogLineReceived += SendLine;
        }

        protected override async Task OnClose(CloseEventArgs e)
        {
            _source.LogLineReceived -= SendLine;
        }

        protected override async Task OnError(ErrorEventArgs e)
        {
            _logger.Warn($"WebSocket service error: {e}");
        }
    }
}
