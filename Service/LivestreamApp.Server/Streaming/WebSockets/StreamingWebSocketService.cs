using LivestreamApp.Server.Streaming.Environment.Devices;
using LivestreamApp.Server.Streaming.Processes;
using Ninject.Extensions.Logging;
using System;
using WebSocketSharp;
using WebSocketSharp.Server;

namespace LivestreamApp.Server.Streaming.WebSockets
{
    public class StreamingWebSocketService : WebSocketBehavior, IDisposable
    {
        private readonly IStreamingDevice _source;
        private readonly ILogger _logger;

        public StreamingWebSocketService(ILogger logger, IStreamingDevice source)
        {
            _logger = logger;
            _source = source;
            IgnoreExtensions = true;
        }

        private void SendBytes(object sender, BytesReceivedEventArgs e)
        {
            Sessions?.Broadcast(e.Bytes);
        }

        protected override void OnOpen()
        {
            _source.BytesReceived += SendBytes;
            _logger.Info("Client connected");
        }

        protected override void OnClose(CloseEventArgs e)
        {
            _source.BytesReceived -= SendBytes;
            _logger.Info("Client disconnected");
        }

        protected override void OnError(ErrorEventArgs e)
        {
            _logger.Info($"WebSocket service error: {e}");
        }

        public void Dispose()
        {
            _source.BytesReceived -= SendBytes;
        }
    }
}
