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
            CreateMap<LivestreamsType, Streams>()
                .ForMember(d => d.Streams, opt => opt.MapFrom(s => s.LiveStreams.ToList()))
                .ConstructUsingServiceLocator();
            CreateMap<LivestreamType, Stream>()
                .ForMember(d => d.Input, opt => opt.MapFrom(s => s.InputSource))
                .ForMember(d => d.IsStarted, opt => opt.Ignore())
                .ForMember(d => d.HasValidInputSource, opt => opt.Ignore())
                .ForMember(d => d.IsStarted, opt => opt.Ignore())
                .ForMember(d => d.IsInitialized, opt => opt.Ignore())
                .ConstructUsingServiceLocator();
            CreateMap<Stream, StreamClientEntity>();
            CreateMap<StreamingSessionsType, Sessions>()
                .ForMember(d => d.Sessions, opt => opt.MapFrom(s => s.StreamingSessions.ToList()));
            CreateMap<Session, SessionClientEntity>();
            CreateMap<StreamingSessionType, Session>()
                .ForMember(d => d.Streams, opt => opt.ResolveUsing<>());
        }
    }
}
