using AutoMapper;
using LivestreamApp.Server.Shared.XmlSerialization;
using LivestreamApp.Server.Streaming.Sessions.Entities;
using Ninject.Extensions.Logging;
using System.Linq;

namespace LivestreamApp.Server.Streaming.Sessions
{
    public class SessionsManager : ISessionsManager
    {
        private readonly ILogger _logger;
        private readonly IMapper _mapper;

        private const string StreamingSessionsConfig = "Livestreams.config";
        private const string StreamingSessionsConfigScheme = "LivestreamApp.Server.Livestreams.xsd";

        public StreamingSessions StreamingSessions { get; private set; }

        public SessionsManager(ILogger logger, IMapper mapper)
        {
            _logger = logger;
            _mapper = mapper;
            LoadStreamingSessionsFromConfig();
        }

        public void LoadStreamingSessionsFromConfig()
        {
            var streamingSessionsType =
                XmlUtilities.ValidateAndDeserialize<StreamingSessionsType>(StreamingSessionsConfig,
                    StreamingSessionsConfigScheme);

            StreamingSessions = _mapper.Map<StreamingSessions>(streamingSessionsType);
        }

        public void UpdateStreaminSession(StreamingSessionBackendEntity streamingSessionBackendEntity)
        {
            var streamingSession = _mapper.Map<StreamingSession>(streamingSessionBackendEntity);
            if (streamingSession.Id == null)
            {
                // Get id
                StreamingSessions.Sessions.Add(streamingSession);
                _logger.Info($"Added new streaming session with id: {streamingSession.Id}.");
            }
            else
            {
                var streamingSessionToUpdate =
                    StreamingSessions.Sessions
                        .FirstOrDefault(ss => ss.Id.Equals(streamingSession.Id));

                if (streamingSessionToUpdate != null)
                {
                    StreamingSessions.Sessions.Remove(streamingSessionToUpdate);
                    StreamingSessions.Sessions.Add(streamingSession);
                    _logger.Info($"Updated streaming session with id: {streamingSession.Id}.");
                }
                else
                {
                    _logger.Warn($"Updating streaming session failed, id {streamingSession.Id} not found.");
                }
            }
            UpdateConfig();
        }

        public void DeleteStreamingSession(string id)
        {
            _logger.Info($"Deleting streming session with id: {id}.");
            var sessionToRemove = StreamingSessions.Sessions.FirstOrDefault(l => l.Id.Equals(id));
            if (sessionToRemove != null)
            {
                StreamingSessions.Sessions.Remove(sessionToRemove);
            }
            UpdateConfig();
        }

        private void UpdateConfig()
        {
            var streamingSessionsType = _mapper.Map<StreamingSessionsType>(StreamingSessions);
            XmlUtilities.Serialize(streamingSessionsType, StreamingSessionsConfig);
            _logger.Info("StremingSessions.config updated.");
        }
    }
}
