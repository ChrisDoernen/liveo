using LivestreamService.Server.Entities;
using System.Collections.Generic;

namespace LivestreamService.Server.Streaming
{
    public interface IStreamingServer
    {
        List<Livestream> GetStartedLiveStreams();
        void Shutdown();
        void ShutdownServer();
        void Start();
        void StartStream(string id);
        void StartStreams();
        void Stop();
        void StopStream(string id);
    }
}