using AutoMapper;
using LivestreamApp.Server.Shared.XmlSerialization;
using LivestreamApp.Server.Streaming.Sessions.Entities;
using Ninject.Extensions.Logging;
using System.Linq;

namespace LivestreamApp.Server.Streaming.Sessions
{
    public class SessionManager : ISessionManager
    {
        private readonly ILogger _logger;
        private readonly IMapper _mapper;

        private const string SessionsConfig = "Sessions.config";
        private const string SessionsConfigScheme = "LivestreamApp.Server.Sessions.xsd";

        public Sessions Sessions { get; private set; }

        public SessionManager(ILogger logger, IMapper mapper)
        {
            _logger = logger;
            _mapper = mapper;
            LoadSessionsFromConfig();
        }

        public void LoadSessionsFromConfig()
        {
            var sessionsType =
                XmlUtilities.ValidateAndDeserialize<SessionsType>(SessionsConfig,
                    SessionsConfigScheme);

            Sessions = _mapper.Map<Sessions>(sessionsType);
        }

        public void UpdateSession(SessionBackendEntity sessionBackendEntity)
        {
            var streamingSession = _mapper.Map<Session>(sessionBackendEntity);
            if (streamingSession.Id == null)
            {
                // Get id
                Sessions.SessionList.Add(streamingSession);
                _logger.Info($"Added new session with id: {streamingSession.Id}.");
            }
            else
            {
                var streamingSessionToUpdate =
                    Sessions.SessionList.FirstOrDefault(ss => ss.Id.Equals(streamingSession.Id));

                if (streamingSessionToUpdate != null)
                {
                    Sessions.SessionList.Remove(streamingSessionToUpdate);
                    Sessions.SessionList.Add(streamingSession);
                    _logger.Info($"Updated session with id: {streamingSession.Id}.");
                }
                else
                {
                    _logger.Warn($"Updating session failed, id {streamingSession.Id} not found.");
                }
            }
            UpdateConfig();
        }

        public void DeleteSession(string id)
        {
            _logger.Info($"Deleting session with id: {id}.");
            var sessionToRemove = Sessions.SessionList.FirstOrDefault(l => l.Id.Equals(id));
            if (sessionToRemove != null)
            {
                Sessions.SessionList.Remove(sessionToRemove);
            }
            UpdateConfig();
        }

        private void UpdateConfig()
        {
            var streamingSessionsType = _mapper.Map<SessionsType>(Sessions);
            XmlUtilities.Serialize(streamingSessionsType, SessionsConfig);
            _logger.Info("Sessions.config updated.");
        }
    }
}
