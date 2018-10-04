using LivestreamApp.Server.Shared.XmlSerialization;
using LivestreamApp.Server.Streaming.Sessions.Entities;
using Ninject.Extensions.Logging;
using System.Linq;

namespace LivestreamApp.Server.Streaming.Sessions
{
    public class SessionsManager : ISessionsManager
    {
        private readonly ILogger _logger;
        private readonly ITypeSerializer _typeSerializer;

        private const string StreamingSessionsConfig = "Livestreams.config";
        private const string StreamingSessionsConfigScheme = "LivestreamApp.Server.Livestreams.xsd";

        public StreamingSessions StreamingSessions { get; private set; }

        public SessionsManager(ILogger logger, ITypeSerializer typeSerializer)
        {
            _logger = logger;
            _typeSerializer = typeSerializer;
            GetStreamingSessionsFromConfig();
        }

        public void GetStreamingSessionsFromConfig()
        {
            StreamingSessions = _typeSerializer
                .DeserializeAndMap<StreamingSessionsType, StreamingSessions>(
                    StreamingSessionsConfig, StreamingSessionsConfigScheme);
        }

        public void UpdateStreaminSession(StreamingSessionBackendEntity streamingSession)
        {
            _logger.Info($"Adding new streming session with id: {streamingSession.Id}.");
            // ToDo
            StreamingSessions.Sessions.Add(streamingSession);
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
            _typeSerializer.MapAndSerialize<StreamingSessions, StreamingSessionsType>(
                StreamingSessions, StreamingSessionsConfig);
            _logger.Info("Updating StremingSessions.config.");
        }
    }
}
