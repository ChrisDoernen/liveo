using AutoMapper;
using LivestreamService.Server.Entities;
using LivestreamService.Server.Streaming;
using System.Linq;

namespace LivestreamService.Server.AppConfiguration
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<LivestreamsType, Livestreams>()
                    .ForMember(d => d.Streams, opt => opt.MapFrom(s => s.LiveStream.ToList()));
            CreateMap<LivestreamType, Livestream>()
                     .ForMember(d => d.HasValidAudioInput, opt => opt.Ignore())
                     .ForMember(d => d.IsInitialized, opt => opt.Ignore())
                     .ForMember(d => d.IsStarted, opt => opt.Ignore());
        }
    }
}
