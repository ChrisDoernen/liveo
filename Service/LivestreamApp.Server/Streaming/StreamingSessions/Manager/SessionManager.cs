using AutoMapper;
using LivestreamApp.Server.Shared.Utilities;
using LivestreamApp.Server.Streaming.StreamingSessions.Entities;
using LivestreamApp.Shared.AppSettings;
using LivestreamApp.Shared.Utilities;
using Ninject.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;

namespace LivestreamApp.Server.Streaming.StreamingSessions.Manager
{
    public class SessionManager : ISessionManager
    {
        private readonly ILogger _logger;
        private readonly IMapper _mapper;
        private readonly IHashGenerator _hashGenerator;

        private readonly string _config;
        private const string Scheme = "LivestreamApp.Server.Sessions.xsd";

        private Sessions Sessions { get; set; }

        public SessionManager(ILogger logger, IMapper mapper, IHashGenerator hashGenerator,
            IAppSettingsProvider appSettingsProvider)
        {
            _logger = logger;
            _mapper = mapper;
            _hashGenerator = hashGenerator;
            _config = appSettingsProvider.GetStringValue(AppSetting.SessionsConfigurationFile);
            LoadSessionsFromConfig();
        }

        private void LoadSessionsFromConfig()
        {
            var sessionsType = XmlSerializer.ValidateAndDeserialize<SessionsType>(_config, Scheme);
            Sessions = _mapper.Map<Sessions>(sessionsType);
            _logger.Info($"Sessions loaded from config ({Sessions.SessionList.Count}).");
        }

        /// <inheritdoc />
        public List<Session> GetSessions()
        {
            return Sessions.SessionList;
        }

        /// <inheritdoc />
        public void CreateSession(SessionBackendEntity sessionBackendEntity)
        {
            var session = _mapper.Map<Session>(sessionBackendEntity);
            session.Id = GetNewSessionId(session);
            Sessions.SessionList.Add(session);
            _logger.Info($"Added new session with id {session.Id}.");
        }

        /// <inheritdoc />
        public void UpdateSession(SessionBackendEntity sessionBackendEntity)
        {
            var session = _mapper.Map<Session>(sessionBackendEntity);
            var sessionToUpdate = Sessions.SessionList.FirstOrDefault(s => s.Id.Equals(session.Id));

            if (sessionToUpdate != null)
            {
                Sessions.SessionList.Remove(sessionToUpdate);
                Sessions.SessionList.Add(session);
                _logger.Info($"Updated session with id {session.Id}.");
                UpdateConfig();
            }
            else
            {
                _logger.Warn($"Updating session failed, id {session.Id} not found.");
            }
        }

        /// <inheritdoc />
        public void DeleteSession(string id)
        {
            _logger.Info($"Deleting session with id {id}.");
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
            XmlSerializer.Serialize(streamingSessionsType, _config);
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
