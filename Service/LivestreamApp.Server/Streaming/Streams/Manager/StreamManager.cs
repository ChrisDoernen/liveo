using AutoMapper;
using LivestreamApp.Server.Shared.XmlSerialization;
using LivestreamApp.Server.Streaming.Streams.Entities;
using Ninject.Extensions.Logging;
using System.Linq;

namespace LivestreamApp.Server.Streaming.Streams.Manager
{
    public class StreamManager : IStreamManager
    {
        private readonly ILogger _logger;
        private readonly IMapper _mapper;
        private const string StreamsConfig = "Streams.config";
        private const string StreamsConfigScheme = "LivestreamApp.Server.Streams.xsd";

        public Streams Streams { get; private set; }

        public StreamManager(ILogger logger, IMapper mappper)
        {
            _logger = logger;
            _mapper = mappper;
            LoadStreamsFromConfig();
        }

        public void LoadStreamsFromConfig()
        {
            var streamsType =
                XmlUtilities.ValidateAndDeserialize<StreamsType>(StreamsConfig,
                    StreamsConfigScheme);

            Streams = _mapper.Map<Streams>(streamsType);
        }

        public void UpdateStream(StreamBackendEntity streamBackendEntity)
        {
            var livestream = _mapper.Map<Stream>(streamBackendEntity);
            if (livestream.Id == null)
            {
                // Get id
                Streams.StreamList.Add(livestream);
                _logger.Info($"Added new stream with id: {livestream.Id}.");
            }
            else
            {
                var livestreamToUpdate =
                    Streams.StreamList
                        .FirstOrDefault(l => l.Id.Equals(livestream.Id));

                if (livestreamToUpdate != null)
                {
                    Streams.StreamList.Remove(livestreamToUpdate);
                    Streams.StreamList.Add(livestream);
                    _logger.Info($"Updated stream with id: {livestream.Id}.");
                }
                else
                {
                    _logger.Warn($"Updating stream failed, id {livestream.Id} not found.");
                }
            }

            UpdateConfig();
        }

        public void DeleteStream(string id)
        {
            _logger.Info($"Deleting stream with id: {id}.");
            var livestreamToRemove = Streams.StreamList.FirstOrDefault(l => l.Id.Equals(id));
            if (livestreamToRemove != null)
            {
                Streams.StreamList.Remove(livestreamToRemove);
            }
            UpdateConfig();
        }

        private void UpdateConfig()
        {
            var streamsType = _mapper.Map<StreamsType>(Streams.StreamList);
            XmlUtilities.Serialize(streamsType, StreamsConfig);
            _logger.Info("Streams.config updated.");
        }
    }
}
