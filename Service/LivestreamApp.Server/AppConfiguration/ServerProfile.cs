using AutoMapper;
using LivestreamApp.Server.Streaming.Entities;
using LivestreamApp.Server.Streaming.Environment.Devices;
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
                .ForMember(d => d.Device, opt => opt.MapFrom(s => new AudioDevice(s.AudioInput)))
                .ForMember(d => d.HasValidAudioInput, opt => opt.Ignore())
                .ForMember(d => d.IsInitialized, opt => opt.Ignore())
                .ForMember(d => d.IsStarted, opt => opt.Ignore())
                .ConstructUsingServiceLocator();
        }
    }
}
