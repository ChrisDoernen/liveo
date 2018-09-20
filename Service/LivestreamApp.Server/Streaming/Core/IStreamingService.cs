using LivestreamApp.Server.Streaming.Entities;
using System.Collections.Generic;

namespace LivestreamApp.Server.Streaming.Core
{
    public interface IStreamingService
    {
        List<Livestream> GetStartedLiveStreams();
        void StartStream(string id);
        void StartStreams();
        void StopStream(string id);
        void StopStreams();
    }
}