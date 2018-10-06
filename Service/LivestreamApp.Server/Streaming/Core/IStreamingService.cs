using LivestreamApp.Server.Streaming.Streams;
using System.Collections.Generic;

namespace LivestreamApp.Server.Streaming.Core
{
    public interface IStreamingService
    {
        List<Stream> GetStartedLiveStreams();
        void StartStream(string id);
        void StartStreams();
        void StopStream(string id);
        void StopStreams();
    }
}