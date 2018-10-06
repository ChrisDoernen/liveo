using LivestreamApp.Server.Streaming.Sessions.Entities;
using Ninject.Extensions.Logging;

namespace LivestreamApp.Server.Streaming.Sessions
{
    public class SessionService : ISessionService
    {
        public Session CurrentSession { get; }

        private readonly ILogger _logger;

        public SessionService(ILogger logger)
        {
            _logger = logger;
            CurrentSession = new Session(logger);
            CurrentSession.Streams = null;
            CurrentSession.Title = "SomeSession";
        }
    }
}
