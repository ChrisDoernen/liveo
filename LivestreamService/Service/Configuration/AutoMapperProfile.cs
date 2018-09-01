using AutoMapper;
using LivestreamService.Server.Entities;
using LivestreamService.Server.Streaming;

namespace LivestreamService.Service.Configuration
{
    public class AutoMapperProfile
    {
        public static void Initialize()
        {
            Mapper.Initialize(config => config.CreateMap<LivestreamsType, LiveStreams>());
        }
    }
}
