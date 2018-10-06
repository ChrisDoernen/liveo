namespace LivestreamApp.Server.Streaming.Sessions.Service
{
    public interface ISessionService
    {
        Session CurrentSession { get; }
    }
}
