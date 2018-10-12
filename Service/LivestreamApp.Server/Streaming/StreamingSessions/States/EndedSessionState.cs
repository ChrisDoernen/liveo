using Ninject.Extensions.Logging;

namespace LivestreamApp.Server.Streaming.StreamingSessions.States
{
    public class EndedSessionState : SessionState, ISessionState
    {
        public EndedSessionState(ILogger logger, ISessionStateFactory sessionStateFactory,
            Session session) : base(logger, sessionStateFactory, session)
        {
        }

        public ISessionState StartSession()
        {
            throw new System.NotImplementedException();
        }

        public ISessionState EndSession()
        {
            throw new System.NotImplementedException();
        }

        public ISessionState PauseSession()
        {
            throw new System.NotImplementedException();
        }

        public ISessionState ResumeSession()
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
