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
            CreateMap<StreamsType, Streams>()
                .ForMember(d => d.StreamList, opt => opt.MapFrom(s => s.Streams.ToList()))
                .ConstructUsingServiceLocator();
            CreateMap<StreamType, Stream>()
                .ForMember(d => d.Input, opt => opt.MapFrom(s => s.InputSource))
                .ForMember(d => d.IsStarted, opt => opt.Ignore())
                .ForMember(d => d.HasValidInputSource, opt => opt.Ignore())
                .ForMember(d => d.IsStarted, opt => opt.Ignore())
                .ForMember(d => d.IsInitialized, opt => opt.Ignore())
                .ConstructUsingServiceLocator();
            CreateMap<Stream, StreamClientEntity>();
            CreateMap<SessionsType, Sessions>()
                .ForMember(d => d.SessionList, opt => opt.MapFrom(s => s.Sessions.ToList()))
                .ConstructUsingServiceLocator();
            CreateMap<Session, SessionClientEntity>();
            CreateMap<SessionType, Session>()
                .ForMember(d => d.TimeStarted, opt => opt.Ignore())
                .ForMember(d => d.TimeEnded, opt => opt.Ignore())
                .ForMember(d => d.Streams, opt => opt.ResolveUsing<SessionValueResolver>())
                .ConstructUsingServiceLocator();
        }
    }
}
