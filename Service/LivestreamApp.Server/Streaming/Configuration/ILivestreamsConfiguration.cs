using LivestreamApp.Server.Streaming.Entities;

namespace LivestreamApp.Server.Streaming.Configuration
{
    public interface ILivestreamsConfiguration
    {
        Livestreams GetAvailableStreams(string configFile);
    }
}