using LivestreamApp.Server.Shared.XmlSerialization;
using LivestreamApp.Server.Streaming.Streams.Entities;
using Ninject.Extensions.Logging;
using System.Linq;

namespace LivestreamApp.Server.Streaming.Streams.Manager
{
    public class LivestreamManager : ILivestreamManager
    {
        private readonly ILogger _logger;
        private readonly ITypeSerializer _typeSerializer;
        private const string LivestreamsConfig = "Livestreams.config";
        private const string LivestreamsConfigScheme = "LivestreamApp.Server.Livestreams.xsd";

        public Livestreams Livestreams { get; private set; }

        public LivestreamManager(ILogger logger, ITypeSerializer typeSerializer)
        {
            _logger = logger;
            _typeSerializer = typeSerializer;
            GetLivestreamsFromConfig();
        }

        public void GetLivestreamsFromConfig()
        {
            Livestreams = _typeSerializer
                .DeserializeAndMap<LivestreamsType, Livestreams>(LivestreamsConfig, LivestreamsConfigScheme);
        }

        public void UpdateLivestream(Livestream livestream)
        {
            _logger.Info($"Adding new livestream with id: {livestream.Id}.");
            // ToDo
            Livestreams.Streams.Add(livestream);
            UpdateConfig();
        }

        public void DeleteLivestream(string id)
        {
            _logger.Info($"Deleting livestream with id: {id}.");
            var livestreamToRemove = Livestreams.Streams.FirstOrDefault(l => l.Id.Equals(id));
            if (livestreamToRemove != null)
            {
                Livestreams.Streams.Remove(livestreamToRemove);
            }
            UpdateConfig();
        }

        private void UpdateConfig()
        {
            _typeSerializer.MapAndSerialize<Livestreams, LivestreamsType>(Livestreams, LivestreamsConfig);
            _logger.Info("Updating Livestreams.config.");
        }
    }
}
