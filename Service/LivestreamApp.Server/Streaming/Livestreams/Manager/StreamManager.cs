using AutoMapper;
using LivestreamApp.Server.Shared.Utilities;
using LivestreamApp.Server.Streaming.Livestreams.Entities;
using LivestreamApp.Shared.Utilities;
using Ninject.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;

namespace LivestreamApp.Server.Streaming.Livestreams.Manager
{
    public class StreamManager : IStreamManager
    {
        private readonly ILogger _logger;
        private readonly IMapper _mapper;
        private readonly IHashGenerator _hashGenerator;
        private const string Config = "Streams.config";
        private const string Scheme = "LivestreamApp.Server.Streams.xsd";

        private Streams Streams { get; set; }

        public StreamManager(ILogger logger, IMapper mappper, IHashGenerator hashGenerator)
        {
            _logger = logger;
            _mapper = mappper;
            _hashGenerator = hashGenerator;
            LoadStreamsFromConfig();
        }

        public void LoadStreamsFromConfig()
        {
            var streamsType = XmlSerializer.ValidateAndDeserialize<StreamsType>(Config, Scheme);
            Streams = _mapper.Map<Streams>(streamsType);
        }

        public List<Stream> GetStreams()
        {
            return Streams.StreamList;
        }

        public void CreateStream(StreamBackendEntity streamBackendEntity)
        {
            var stream = _mapper.Map<Stream>(streamBackendEntity);
            stream.Id = GetNewSessionId(stream);
            Streams.StreamList.Add(stream);
            _logger.Info($"Added new stream with id {stream.Id}.");
        }

        public void UpdateStream(StreamBackendEntity streamBackendEntity)
        {
            var stream = _mapper.Map<Stream>(streamBackendEntity);
            var streamToUpdate = Streams.StreamList.FirstOrDefault(l => l.Id.Equals(stream.Id));

            if (streamToUpdate != null)
            {
                Streams.StreamList.Remove(streamToUpdate);
                Streams.StreamList.Add(stream);
                _logger.Info($"Updated stream with id {stream.Id}.");
                UpdateConfig();
            }
            else
            {
                _logger.Warn($"Updating stream failed, id {stream.Id} not found.");
            }
        }

        public void DeleteStream(string id)
        {
            _logger.Info($"Deleting stream with id {id}.");
            var livestreamToRemove = Streams.StreamList.FirstOrDefault(l => l.Id.Equals(id));
            if (livestreamToRemove != null)
            {
                Streams.StreamList.Remove(livestreamToRemove);
            }
            UpdateConfig();
        }

        private void UpdateConfig()
        {
            var streamsType = _mapper.Map<StreamsType>(Streams);
            XmlSerializer.Serialize(streamsType, Config);
            _logger.Info("Streams.config updated.");
        }

        private string GetNewSessionId(Stream stream)
        {
            var hashInput = stream.Title + stream.Description + stream.CountryCode;
            var md5Hash = _hashGenerator.GetMd5Hash(hashInput);
            return md5Hash.Substring(0, 5).ToLower();
        }
    }
}
