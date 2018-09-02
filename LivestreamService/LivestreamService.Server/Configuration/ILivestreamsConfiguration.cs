using LivestreamService.Server.Entities;

namespace LivestreamService.Server.Configuration
{
    public interface ILivestreamsConfiguration
    {
        Livestreams GetAvailableStreams(string configFile);
    }
}