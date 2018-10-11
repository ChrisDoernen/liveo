using AutoMapper;
using LivestreamApp.Server.Streaming.StreamingSessions.Manager;
using Ninject.Extensions.Logging;
using System;

namespace LivestreamApp.Server.Streaming.StreamingSessions.Service
{
    public class SessionService : ISessionService
    {
        private readonly IMapper _mapper;
        private readonly ILogger _logger;
        private readonly ISessionManager _sessionManager;
        private Session _currentSession;

        public SessionService(ILogger logger, IMapper mapper, ISessionManager sessionManager)
        {
            _mapper = mapper ?? throw new ArgumentException(nameof(mapper));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _sessionManager = sessionManager ?? throw new ArgumentNullException(nameof(sessionManager));
        }

        public void SetCurrentSession(string id)
        {
            var session = _sessionManager.GetSession(id);
            _currentSession = session;
            _logger.Debug($"Current session set to {id}.");
        }

        public T GetCurrentSession<T>()
        {
            _logger.Debug($"Returning current session {_currentSession.Id} as {nameof(T)}.");
            return _mapper.Map<T>(_currentSession);
        }
    }
}
