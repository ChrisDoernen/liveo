namespace LivestreamApp.Server.Sessions
{
    public interface ISessionService
    {
        StreamingSession CurrentSession { get; }
    }
}
