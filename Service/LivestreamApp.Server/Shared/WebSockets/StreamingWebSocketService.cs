using LivestreamApp.Server.Shared.Processes;
using LivestreamApp.Server.Streaming.StreamingSources;
using Ninject.Extensions.Logging;
using System;
using System.Threading.Tasks;
using WebSocketSharp;
using WebSocketSharp.Server;

namespace LivestreamApp.Server.Shared.WebSockets
{
    public class StreamingWebSocketService : WebSocketBehavior
    {
        private readonly IStreamingSource _source;
        private readonly ILogger _logger;

        public StreamingWebSocketService(ILogger logger, IStreamingSource source)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _source = source ?? throw new ArgumentNullException(nameof(source));
        }

        private void SendBytes(object sender, BytesReceivedEventArgs e)
        {
            Send(e.Bytes);
        }

        protected override async Task OnOpen()
        {
            _source.BytesReceived += SendBytes;
            _logger.Debug("Client connected");
        }

        protected override async Task OnClose(CloseEventArgs e)
        {
            _source.BytesReceived -= SendBytes;
            _logger.Debug("Client disconnected");
        }

        protected override async Task OnError(ErrorEventArgs e)
        {
            _logger.Error(e.Exception, "WebSocket service error:");
        }
    }
}
