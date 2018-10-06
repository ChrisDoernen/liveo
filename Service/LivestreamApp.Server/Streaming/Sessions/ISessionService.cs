using LivestreamApp.Server.Streaming.Sessions.Entities;

namespace LivestreamApp.Server.Streaming.Sessions
{
    public interface ISessionService
    {
        Session CurrentSession { get; }
    }
}
