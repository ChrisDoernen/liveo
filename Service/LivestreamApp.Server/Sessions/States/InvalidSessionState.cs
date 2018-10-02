namespace LivestreamApp.Server.Sessions.States
{
    public class InvalidSessionState : ISessionState
    {
        public ISessionState StartSession()
        {
            throw new System.NotImplementedException();
        }

        public ISessionState StopSession()
        {
            throw new System.NotImplementedException();
        }

        public ISessionState Pause()
        {
            throw new System.NotImplementedException();
        }

        public ISessionState Resume()
        {
            throw new System.NotImplementedException();
        }

        public ISessionState ScheduleSession()
        {
            throw new System.NotImplementedException();
        }

        public ISessionState UnschduleSession()
        {
            throw new System.NotImplementedException();
        }
    }
}
