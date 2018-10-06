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

        private const string Config = "Sessions.config";
        private const string Scheme = "LivestreamApp.Server.Sessions.xsd";

        public Sessions Sessions { get; private set; }

        public SessionManager(ILogger logger, IMapper mapper)
        {
            _logger = logger;
            _mapper = mapper;
            LoadSessionsFromConfig();
        }

        public void LoadSessionsFromConfig()
        {
            var sessionsType = XmlUtilities.ValidateAndDeserialize<SessionsType>(Config, Scheme);
            Sessions = _mapper.Map<Sessions>(sessionsType);
            _logger.Info($"Sessions loaded from config ({Sessions.SessionList.Count}).");
        }

        public void CreateSession(SessionBackendEntity sessionBackendEntity)
        {
            var session = _mapper.Map<Session>(sessionBackendEntity);
            session.Id = "1"; // Set new id
            Sessions.SessionList.Add(session);
            _logger.Info($"Added new session with id: {session.Id}.");
        }

        public void UpdateSession(SessionBackendEntity sessionBackendEntity)
        {
            var session = _mapper.Map<Session>(sessionBackendEntity);

            var sessionToUpdate = Sessions.SessionList.FirstOrDefault(s => s.Id.Equals(session.Id));

            if (sessionToUpdate != null)
            {
                Sessions.SessionList.Remove(sessionToUpdate);
                Sessions.SessionList.Add(session);
                _logger.Info($"Updated session with id: {session.Id}.");
            }
            else
            {
                _logger.Warn($"Updating session failed, id {session.Id} not found.");
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
            XmlUtilities.Serialize(streamingSessionsType, Config);
            _logger.Info("Sessions.config updated.");
        }
    }
}
