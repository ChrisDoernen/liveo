namespace LivestreamApp.Server.Streaming.Sessions.States
{
    public interface ISessionState
    {
        ISessionState StartSession();
        ISessionState EndSession();
        ISessionState Pause();
        ISessionState Resume();
        ISessionState ScheduleSession();
        ISessionState UnschduleSession();
    }
}
