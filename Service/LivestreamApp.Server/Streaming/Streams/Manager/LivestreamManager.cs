using AutoMapper;
using LivestreamApp.Server.Shared.XmlSerialization;
using LivestreamApp.Server.Streaming.Streams.Entities;
using Ninject.Extensions.Logging;
using System.Linq;

namespace LivestreamApp.Server.Streaming.Streams.Manager
{
    public class LivestreamManager : ILivestreamManager
    {
        private readonly ILogger _logger;
        private readonly IMapper _mapper;
        private const string LivestreamsConfig = "Livestreams.config";
        private const string LivestreamsConfigScheme = "LivestreamApp.Server.Livestreams.xsd";

        public Livestreams Livestreams { get; private set; }

        public LivestreamManager(ILogger logger, IMapper mappper)
        {
            _logger = logger;
            _mapper = mappper;
            LoadLivestreamsFromConfig();
        }

        public void LoadLivestreamsFromConfig()
        {
            var livestreamsType =
                XmlUtilities.ValidateAndDeserialize<LivestreamsType>(LivestreamsConfig,
                    LivestreamsConfigScheme);

            Livestreams = _mapper.Map<Livestreams>(livestreamsType);
        }

        public void UpdateLivestream(LivestreamBackendEntity livestreamBackendEntity)
        {
            var livestream = _mapper.Map<Livestream>(livestreamBackendEntity);
            if (livestream.Id == null)
            {
                // Get id
                Livestreams.Streams.Add(livestream);
                _logger.Info($"Added new livestream with id: {livestream.Id}.");
            }
            else
            {
                var livestreamToUpdate =
                    Livestreams.Streams
                        .FirstOrDefault(l => l.Id.Equals(livestream.Id));

                if (livestreamToUpdate != null)
                {
                    Livestreams.Streams.Remove(livestreamToUpdate);
                    Livestreams.Streams.Add(livestream);
                    _logger.Info($"Updated livestream with id: {livestream.Id}.");
                }
                else
                {
                    _logger.Warn($"Updating livestream failed, id {livestream.Id} not found.");
                }
            }

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
            var livestreamsType = _mapper.Map<LivestreamType>(Livestreams.Streams);
            XmlUtilities.Serialize(livestreamsType, LivestreamsConfig);
            _logger.Info("Livestreams.config updated.");
        }
    }
}
