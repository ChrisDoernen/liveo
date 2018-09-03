using LivestreamService.Server.Entities;
using System.Collections.Generic;

namespace LivestreamService.Server.Streaming
{
    public interface IStreamingServer
    {
        List<Livestream> GetStartedLiveStreams();
        void ShutdownServer();
        void StartStream(string id);
        void StartStreams();
        void StopStream(string id);
        void StopStreams();
    }
}