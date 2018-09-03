using LivestreamApp.Server.Entities;

namespace LivestreamApp.Server.Configuration
{
    public interface ILivestreamsConfiguration
    {
        Livestreams GetAvailableStreams(string configFile);
    }
}