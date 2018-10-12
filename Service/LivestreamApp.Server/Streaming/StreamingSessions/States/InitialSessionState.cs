using Ninject.Extensions.Logging;
using System;

namespace LivestreamApp.Server.Streaming.StreamingSessions.States
{
    public class InitialSessionState : SessionState, ISessionState
    {
        public InitialSessionState(ILogger logger, ISessionStateFactory sessionStateFactory,
            ISession session) : base(logger, sessionStateFactory, session)
        {
        }

        public ISessionState StartSession()
        {
            Session.StartStreams();
            Session.TimeStarted = DateTime.Now;
            Logger.Info("Session successfully started.");
            return SessionStateFactory.GetSessionState<StartedSessionState>(Session);
        }

        public ISessionState EndSession()
        {
            throw new ArgumentException("The session has not yet been started.");
        }

        public ISessionState Pause()
        {
            throw new ArgumentException("The session has not yet been started.");
        }

        public ISessionState Resume()
        {
            throw new ArgumentException("The session has not yet been started.");
        }

        public ISessionState ScheduleSession()
        {
            throw new NotImplementedException();
        }

        public ISessionState UnschduleSession()
        {
            throw new NotImplementedException();
        }
    }
}
