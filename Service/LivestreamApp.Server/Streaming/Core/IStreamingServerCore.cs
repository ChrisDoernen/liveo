using LivestreamApp.Server.Streaming.Entities;
using System.Collections.Generic;

namespace LivestreamApp.Server.Streaming.Core
{
    public interface IStreamingServerCore
    {
        List<Livestream> GetStartedLiveStreams();
        void ShutdownServer();
        void StartStream(string id);
        void StartStreams();
        void StopStream(string id);
        void StopStreams();
    }
}