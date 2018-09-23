using LivestreamApp.Server.Streaming.Processes;
using System;

namespace LivestreamApp.Server.Streaming.Core
{
    public interface IStreamable
    {
        event EventHandler<BytesReceivedEventArgs> BytesReceived;
        void StartStreaming();
        void StopStreaming();
    }
}
