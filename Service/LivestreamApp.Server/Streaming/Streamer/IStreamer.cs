using LivestreamApp.Server.Streaming.Processes;
using System;

namespace LivestreamApp.Server.Streaming.Streamer
{
    public interface IStreamer
    {
        event EventHandler<BytesReceivedEventArgs> BytesReceived;

        void Start();
        void Stop();
    }
}