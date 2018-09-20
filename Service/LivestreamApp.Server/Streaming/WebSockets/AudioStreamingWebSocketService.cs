using LivestreamApp.Server.Streaming.Core;
using LivestreamApp.Server.Streaming.Processes;
using Ninject.Extensions.Logging;
using System;
using WebSocketSharp;
using WebSocketSharp.Server;

namespace LivestreamApp.Server.Streaming.WebSockets
{
    public class AudioStreamingWebSocketService : WebSocketBehavior, IDisposable
    {
        private readonly Mp3Streamer _streamer;
        private readonly ILogger _logger;

        public AudioStreamingWebSocketService(ILogger logger, Mp3Streamer streamer)
        {
            _logger = logger;
            _streamer = streamer;
        }

        private void SendBytes(object sender, BytesReceivedEventArgs e)
        {
            Sessions.Broadcast(e.Bytes);
        }

        protected override void OnOpen()
        {
            _streamer.OutputBytesReceived += SendBytes;
            _logger.Info("Client connected");
        }

        protected override void OnClose(CloseEventArgs e)
        {
            _logger.Info("Client disconnected");
        }

        public void Dispose()
        {
            _streamer.OutputBytesReceived -= SendBytes;
        }
    }
}
