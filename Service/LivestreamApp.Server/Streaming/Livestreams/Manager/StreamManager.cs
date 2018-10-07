using AutoMapper;
using LivestreamApp.Server.Shared.Utilities;
using LivestreamApp.Server.Streaming.Livestreams.Entities;
using LivestreamApp.Shared.AppSettings;
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
        private readonly IConfigDataAdapter _configDataAdapter;

        private readonly string _config;
        private const string Scheme = "LivestreamApp.Server.Streams.xsd";

        private Streams Streams { get; set; }

        public StreamManager(ILogger logger, IHashGenerator hashGenerator, IMapper mapper,
            IAppSettingsProvider appSettingsProvider, IConfigDataAdapter configDataAdapter)
        {
            _logger = logger;
            _mapper = mapper;
            _hashGenerator = hashGenerator;
            _configDataAdapter = configDataAdapter;
            _config = appSettingsProvider.GetStringValue(AppSetting.StreamsConfigurationFile);
            LoadStreamsFromConfig();
        }

        private void LoadStreamsFromConfig()
        {
            Streams = _configDataAdapter.Load<Streams, StreamsType>(_config, Scheme);
            _logger.Info($"Streams loaded from config ({Streams.StreamList.Count}).");
        }

        /// <inheritdoc />
        public List<Stream> GetStreams()
        {
            return Streams.StreamList;
        }

        /// <inheritdoc />
        public void CreateStream(StreamBackendEntity streamBackendEntity)
        {
            var stream = _mapper.Map<Stream>(streamBackendEntity);
            stream.Id = GetNewSessionId(stream);
            Streams.StreamList.Add(stream);
            UpdateConfig();
            _logger.Info($"Added new stream with id {stream.Id}.");
        }

        /// <inheritdoc />
        public void UpdateStream(StreamBackendEntity streamBackendEntity)
        {
            var stream = _mapper.Map<Stream>(streamBackendEntity);
            var streamToUpdate = Streams.StreamList.FirstOrDefault(l => l.Id.Equals(stream.Id));

            if (streamToUpdate != null)
            {
                Streams.StreamList.Remove(streamToUpdate);
                Streams.StreamList.Add(stream);
                UpdateConfig();
                _logger.Info($"Updated stream with id {stream.Id}.");
            }
            else
            {
                _logger.Warn($"Updating stream failed, id {stream.Id} not found.");
            }
        }

        /// <inheritdoc />
        public void DeleteStream(string id)
        {
            var livestreamToRemove = Streams.StreamList.FirstOrDefault(l => l.Id.Equals(id));
            if (livestreamToRemove != null)
            {
                Streams.StreamList.Remove(livestreamToRemove);
                UpdateConfig();
                _logger.Info($"Deleted stream with id {id}.");
            }
            else
            {
                _logger.Warn($"Deleting stream failed, id {id} not found.");
            }
        }

        private void UpdateConfig()
        {
            _configDataAdapter.Save<Streams, StreamsType>(Streams, _config);
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
