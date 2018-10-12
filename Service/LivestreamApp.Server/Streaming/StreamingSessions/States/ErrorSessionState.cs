using Ninject.Extensions.Logging;

namespace LivestreamApp.Server.Streaming.StreamingSessions.States
{
    public class ErrorSessionState : SessionState, ISessionState
    {
        public ErrorSessionState(ILogger logger, ISessionStateFactory sessionStateFactory,
            ISession session) : base(logger, sessionStateFactory, session)
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
