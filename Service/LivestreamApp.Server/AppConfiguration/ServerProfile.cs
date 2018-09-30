using AutoMapper;
using LivestreamApp.Server.Streaming.Entities;
using System.Linq;

namespace LivestreamApp.Server.AppConfiguration
{
    public class ServerProfile : Profile
    {
        public ServerProfile()
        {
            CreateMap<LivestreamsType, Livestreams>()
                .ForMember(d => d.Streams, opt => opt.MapFrom(s => s.LiveStream.ToList()))
                .ConstructUsingServiceLocator();
            CreateMap<LivestreamType, Livestream>()
                .ForMember(d => d.Input, opt => opt.MapFrom(s => s.InputSource))
                .ForMember(d => d.IsStarted, opt => opt.Ignore())
                .ForMember(d => d.HasValidInputSource, opt => opt.Ignore())
                .ForMember(d => d.IsStarted, opt => opt.Ignore())
                .ForMember(d => d.IsInitialized, opt => opt.Ignore())
                .ConstructUsingServiceLocator();
        }
    }
}
