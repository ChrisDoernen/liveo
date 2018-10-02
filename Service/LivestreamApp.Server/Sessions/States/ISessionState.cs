namespace LivestreamApp.Server.Sessions.States
{
    public interface ISessionState
    {
        ISessionState StartSession();
        ISessionState StopSession();
        ISessionState Pause();
        ISessionState Resume();
        ISessionState ScheduleSession();
        ISessionState UnschduleSession();
    }
}
