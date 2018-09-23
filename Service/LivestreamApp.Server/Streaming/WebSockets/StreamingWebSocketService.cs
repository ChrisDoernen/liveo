using LivestreamApp.Server.Streaming.Processes;
using LivestreamApp.Server.Streaming.Streamer;
using Ninject.Extensions.Logging;
using System;
using WebSocketSharp;
using WebSocketSharp.Server;

namespace LivestreamApp.Server.Streaming.WebSockets
{
    public class StreamingWebSocketService : WebSocketBehavior, IDisposable
    {
        private readonly IStreamable _streamer;
        private readonly ILogger _logger;

        public StreamingWebSocketService(ILogger logger, IStreamable streamer)
        {
            _logger = logger;
            _streamer = streamer;
            IgnoreExtensions = true;
        }

        private void SendBytes(object sender, BytesReceivedEventArgs e)
        {
            Sessions?.Broadcast(e.Bytes);
        }

        protected override void OnOpen()
        {
            _streamer.BytesReceived += SendBytes;
            _logger.Info("Client connected");
        }

        protected override void OnClose(CloseEventArgs e)
        {
            _streamer.BytesReceived -= SendBytes;
            _logger.Info("Client disconnected");
        }

        protected override void OnError(ErrorEventArgs e)
        {
            _logger.Info($"WebSocket service error: {e}");
        }

        public void Dispose()
        {
            _streamer.BytesReceived -= SendBytes;
        }
    }
}
