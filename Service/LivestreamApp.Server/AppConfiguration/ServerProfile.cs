using AutoMapper;
using LivestreamApp.Server.Streaming.Sessions;
using LivestreamApp.Server.Streaming.Sessions.Entities;
using LivestreamApp.Server.Streaming.Streams;
using LivestreamApp.Server.Streaming.Streams.Entities;
using System.Linq;

namespace LivestreamApp.Server.AppConfiguration
{
    public class ServerProfile : Profile
    {
        public ServerProfile()
        {
            CreateMap<LivestreamsType, Livestreams>()
                .ForMember(d => d.Streams, opt => opt.MapFrom(s => s.LiveStreams.ToList()))
                .ConstructUsingServiceLocator();
            CreateMap<LivestreamType, Livestream>()
                .ForMember(d => d.Input, opt => opt.MapFrom(s => s.InputSource))
                .ForMember(d => d.IsStarted, opt => opt.Ignore())
                .ForMember(d => d.HasValidInputSource, opt => opt.Ignore())
                .ForMember(d => d.IsStarted, opt => opt.Ignore())
                .ForMember(d => d.IsInitialized, opt => opt.Ignore())
                .ConstructUsingServiceLocator();
            CreateMap<Livestream, LivestreamClientEntity>();
            CreateMap<StreamingSessionsType, StreamingSessions>()
                .ForMember(d => d.Sessions, opt => opt.MapFrom(s => s.StreamingSessions.ToList()));
            CreateMap<StreamingSession, StreamingSessionClientEntity>();
            CreateMap<StreamingSessionType, StreamingSession>()
                .ForMember(d => d.Livestreams, opt => opt.ResolveUsing<>());
        }
    }
}
