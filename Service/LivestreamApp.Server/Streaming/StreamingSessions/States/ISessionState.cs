namespace LivestreamApp.Server.Streaming.StreamingSessions.States
{
    public interface ISessionState
    {
        ISessionState StartSession();
        ISessionState EndSession();
        ISessionState PauseSession();
        ISessionState ResumeSession();
        ISessionState ScheduleSession();
        ISessionState UnschduleSession();
    }
}
