using AutoMapper;
using LivestreamApp.Server.Streaming.Sessions;
using LivestreamApp.Server.Streaming.Sessions.Entities;
using LivestreamApp.Server.Streaming.Streams;

namespace LivestreamApp.Server.AppConfiguration
{
    public class StreamingSessionValueResolver
        : IValueResolver<StreamingSessionType, StreamingSession, Livestreams>
    {
        public Livestreams Resolve(StreamingSessionType source, StreamingSession destination,
            Livestreams member, ResolutionContext context)
        {
            return null;
        }
    }
}
