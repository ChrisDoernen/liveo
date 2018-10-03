using Ninject.Extensions.Logging;

namespace LivestreamApp.Server.Sessions
{
    public class SessionService : ISessionService
    {
        public StreamingSession CurrentSession { get; }

        private readonly ILogger _logger;

        public SessionService(ILogger logger)
        {
            _logger = logger;
            CurrentSession = new StreamingSession(logger);
            CurrentSession.Livestreams = null;
            CurrentSession.Title = "SomeSession";
        }
    }
}
