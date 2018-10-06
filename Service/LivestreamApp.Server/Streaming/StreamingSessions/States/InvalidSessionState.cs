namespace LivestreamApp.Server.Streaming.StreamingSessions.States
{
    public class InvalidSessionState : ISessionState
    {
        public ISessionState StartSession()
        {
            throw new System.NotImplementedException();
        }

        public ISessionState EndSession()
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
