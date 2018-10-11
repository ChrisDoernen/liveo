using AutoMapper;
using LivestreamApp.Server.Shared.Utilities;
using LivestreamApp.Server.Streaming.StreamingSessions.Entities;
using LivestreamApp.Shared.AppSettings;
using LivestreamApp.Shared.Utilities;
using Ninject.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;

namespace LivestreamApp.Server.Streaming.StreamingSessions.Manager
{
    public class SessionManager : ISessionManager
    {
        private readonly ILogger _logger;
        private readonly IMapper _mapper;
        private readonly IHashGenerator _hashGenerator;
        private readonly IConfigAdapter _configAdapter;

        private readonly string _config;
        private const string Scheme = "LivestreamApp.Server.Sessions.xsd";

        private Sessions Sessions { get; set; }

        public SessionManager(ILogger logger, IMapper mapper, IHashGenerator hashGenerator,
            IAppSettingsProvider appSettingsProvider, IConfigAdapter configAdapter)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _hashGenerator = hashGenerator ?? throw new ArgumentNullException(nameof(hashGenerator));
            _configAdapter = configAdapter ?? throw new ArgumentNullException(nameof(configAdapter));
            _config = appSettingsProvider.GetStringValue(AppSetting.SessionsConfigurationFile);
            LoadSessionsFromConfig();
        }

        private void LoadSessionsFromConfig()
        {
            Sessions = _configAdapter.Load<Sessions, SessionsType>(_config, Scheme);
            _logger.Info($"Sessions loaded from config ({Sessions.SessionList.Count}).");
        }

        /// <inheritdoc />
        public List<Session> GetSessions()
        {
            return Sessions.SessionList;
        }

        /// <inheritdoc />
        public Session GetSession(string id)
        {
            var session = Sessions.SessionList.FirstOrDefault(s => s.Id.Equals(id));

            if (session == null)
            {
                _logger.Warn($"The session with id {id} could not be found.");
                throw new ArgumentException($"The session with id {id} could not be found.");
            }

            return session;
        }

        /// <inheritdoc />
        public void CreateSession(SessionBackendEntity sessionBackendEntity)
        {
            var session = _mapper.Map<Session>(sessionBackendEntity);
            session.Id = GetNewSessionId(session);
            Sessions.SessionList.Add(session);
            UpdateConfig();
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
                UpdateConfig();
                _logger.Info($"Updated session with id {session.Id}.");
            }
            else
            {
                _logger.Warn($"Updating session failed, id {session.Id} not found.");
            }
        }

        /// <inheritdoc />
        public void DeleteSession(string id)
        {
            var sessionToRemove = Sessions.SessionList.FirstOrDefault(l => l.Id.Equals(id));
            if (sessionToRemove != null)
            {
                Sessions.SessionList.Remove(sessionToRemove);
                UpdateConfig();
                _logger.Info($"Deleted session with id {id}.");
            }
            else
            {
                _logger.Warn($"Deleting session failed, id {id} not found.");
            }
        }

        private void UpdateConfig()
        {
            _configAdapter.Save<Sessions, SessionsType>(Sessions, _config);
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
