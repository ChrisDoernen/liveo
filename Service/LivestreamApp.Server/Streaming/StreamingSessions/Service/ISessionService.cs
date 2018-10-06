using LivestreamApp.Server.Streaming.StreamingSessions.Entities;

namespace LivestreamApp.Server.Streaming.StreamingSessions.Service
{
    public interface ISessionService
    {
        SessionClientEntity CurrentSessionClientEntity { get; }
        Session CurrentSession { get; }
    }
}
