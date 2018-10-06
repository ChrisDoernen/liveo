using LivestreamApp.Server.Streaming.StreamingSessions.Entities;
using LivestreamApp.Server.Streaming.StreamingSessions.Manager;
using Ninject.Extensions.Logging;

namespace LivestreamApp.Server.Streaming.StreamingSessions.Service
{
    public class SessionService : ISessionService
    {
        public SessionClientEntity CurrentSessionClientEntity { get; }
        public Session CurrentSession { get; }

        private readonly ILogger _logger;
        private readonly ISessionManager _sessionManager;

        public SessionService(ILogger logger, ISessionManager sessionManager)
        {
            _logger = logger;
            _sessionManager = sessionManager;
        }

    }
}
