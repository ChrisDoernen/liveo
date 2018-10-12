using Ninject.Extensions.Logging;
using System;

namespace LivestreamApp.Server.Streaming.StreamingSessions.States
{
    public class SessionState
    {
        protected ILogger Logger;
        protected Session Session { get; }
        protected ISessionStateFactory SessionStateFactory;

        public SessionState(ILogger logger, ISessionStateFactory sessionStateFactory, Session session)
        {
            Logger = logger ?? throw new ArgumentNullException(nameof(logger));
            SessionStateFactory = sessionStateFactory ?? throw new ArgumentNullException(nameof(sessionStateFactory));
            Session = session ?? throw new ArgumentNullException(nameof(session));
        }
    }
}
