using AutoMapper;
using LivestreamApp.Server.Streaming.Livestreams;
using LivestreamApp.Server.Streaming.Livestreams.Entities;
using LivestreamApp.Server.Streaming.StreamingSessions;
using LivestreamApp.Server.Streaming.StreamingSessions.Entities;
using System.Linq;

namespace LivestreamApp.Server.AppConfiguration
{
    public class ServerProfile : Profile
    {
        public ServerProfile()
        {
            // Streams
            CreateMap<StreamsType, Streams>()
                .ForMember(d => d.StreamList, opt => opt.MapFrom(s => s.Streams.ToList()))
                .ConstructUsingServiceLocator();
            CreateMap<Streams, StreamsType>()
                .ForMember(d => d.Streams, opt => opt.MapFrom(s => s.StreamList.ToArray()));
            CreateMap<StreamType, Stream>()
                .ForMember(d => d.IsStarted, opt => opt.Ignore())
                .ForMember(d => d.HasValidInputSource, opt => opt.Ignore())
                .ForMember(d => d.IsStarted, opt => opt.Ignore())
                .ForMember(d => d.IsInitialized, opt => opt.Ignore())
                .ConstructUsingServiceLocator();
            CreateMap<StreamBackendEntity, Stream>()
                .ForMember(d => d.IsStarted, opt => opt.Ignore())
                .ForMember(d => d.HasValidInputSource, opt => opt.Ignore())
                .ForMember(d => d.IsInitialized, opt => opt.Ignore())
                .ConstructUsingServiceLocator();
            CreateMap<Stream, StreamClientEntity>();

            // Sessions
            CreateMap<SessionsType, Sessions>()
                .ForMember(d => d.SessionList, opt => opt.MapFrom(s => s.Sessions.ToList()))
                .ConstructUsingServiceLocator();
            CreateMap<Sessions, SessionsType>()
                .ForMember(d => d.Sessions,
                    opt => opt.MapFrom(s => s.SessionList.Select(se => se.Id).ToArray()));
            CreateMap<SessionType, Session>()
                .ForMember(d => d.TimeStarted, opt => opt.Ignore())
                .ForMember(d => d.TimeEnded, opt => opt.Ignore())
                .ForMember(d => d.Streams, opt => opt.ResolveUsing<SessionValueResolver>())
                .ConstructUsingServiceLocator();
            CreateMap<SessionBackendEntity, Session>()
                .ForMember(d => d.TimeStarted, opt => opt.Ignore())
                .ForMember(d => d.TimeEnded, opt => opt.Ignore())
                .ConstructUsingServiceLocator();
            CreateMap<Session, SessionClientEntity>();
        }
    }
}
