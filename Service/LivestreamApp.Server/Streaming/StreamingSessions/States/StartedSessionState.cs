using Ninject.Extensions.Logging;
using System;

namespace LivestreamApp.Server.Streaming.StreamingSessions.States
{
    public class StartedSessionState : SessionState, ISessionState
    {
        public StartedSessionState(ILogger logger, ISessionStateFactory sessionStateFactory,
            ISession session) : base(logger, sessionStateFactory, session)
        {
        }

        public ISessionState StartSession()
        {
            throw new ArgumentException("Session is already started.");
        }

        public ISessionState EndSession()
        {
            Session.StopStreams();
            Session.TimeEnded = DateTime.Now;
            Logger.Info("Session ended.");
            return SessionStateFactory.GetSessionState<EndedSessionState>(Session);
        }

        public ISessionState Pause()
        {
            Session.StopStreams();
            Logger.Info("Session paused.");
            return SessionStateFactory.GetSessionState<PausedSessionState>(Session);
        }

        public ISessionState Resume()
        {
            throw new ArgumentException("Session is already started.");
        }

        public ISessionState ScheduleSession()
        {
            throw new ArgumentException("Session is already started.");
        }

        public ISessionState UnschduleSession()
        {
            throw new ArgumentException("Session is already started.");
        }
    }
}
