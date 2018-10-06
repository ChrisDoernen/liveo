using AutoMapper;
using LivestreamApp.Server.Streaming.Sessions;
using LivestreamApp.Server.Streaming.Sessions.Entities;
using LivestreamApp.Server.Streaming.Streams;

namespace LivestreamApp.Server.AppConfiguration
{
    public class StreamingSessionValueResolver
        : IValueResolver<StreamingSessionType, Session, Streams>
    {
        public Streams Resolve(StreamingSessionType source, Session destination,
            Streams member, ResolutionContext context)
        {
            return null;
        }
    }
}
