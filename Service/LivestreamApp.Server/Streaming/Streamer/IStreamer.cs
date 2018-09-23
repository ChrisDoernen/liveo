using LivestreamApp.Server.Streaming.Processes;
using System;

namespace LivestreamApp.Server.Streaming.Streamer
{
    public interface IStreamer
    {
        event EventHandler<BytesReceivedEventArgs> BytesReceived;
        string DeviceId();
        void Start();
        void Stop();
    }
}
