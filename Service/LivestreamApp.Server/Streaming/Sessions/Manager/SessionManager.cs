using AutoMapper;
using LivestreamApp.Server.Shared.Utilities;
using LivestreamApp.Server.Streaming.Sessions.Entities;
using LivestreamApp.Shared.Utilities;
using Ninject.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;

namespace LivestreamApp.Server.Streaming.Sessions.Manager
{
    public class SessionManager : ISessionManager
    {
        private readonly ILogger _logger;
        private readonly IMapper _mapper;
        private readonly IHashGenerator _hashGenerator;

        private const string Config = "Sessions.config";
        private const string Scheme = "LivestreamApp.Server.Sessions.xsd";

        private Sessions Sessions { get; set; }

        public SessionManager(ILogger logger, IMapper mapper, IHashGenerator hashGenerator)
        {
            _logger = logger;
            _mapper = mapper;
            _hashGenerator = hashGenerator;
            LoadSessionsFromConfig();
        }

        public void LoadSessionsFromConfig()
        {
            var sessionsType = XmlSerializer.ValidateAndDeserialize<SessionsType>(Config, Scheme);
            Sessions = _mapper.Map<Sessions>(sessionsType);
            _logger.Info($"Sessions loaded from config ({Sessions.SessionList.Count}).");
        }

        public List<Session> GetSessions()
        {
            return Sessions.SessionList;
        }

        public void CreateSession(SessionBackendEntity sessionBackendEntity)
        {
            var session = _mapper.Map<Session>(sessionBackendEntity);
            session.Id = GetNewSessionId(session);
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
                UpdateConfig();
            }
            else
            {
                _logger.Warn($"Updating session failed, id {session.Id} not found.");
            }
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
            XmlSerializer.Serialize(streamingSessionsType, Config);
            _logger.Info("Sessions.config updated.");
        }

        private string GetNewSessionId(Session session)
        {
            var hashInput = session.Title + session.InternalTitle + session.Description;
            var md5Hash = _hashGenerator.GetMd5Hash(hashInput);
            return md5Hash.Substring(0, 5).ToLower();
        }
    }
}
