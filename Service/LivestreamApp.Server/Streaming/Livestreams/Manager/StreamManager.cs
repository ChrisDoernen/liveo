using AutoMapper;
using LivestreamApp.Server.Shared.Utilities;
using LivestreamApp.Server.Streaming.Livestreams.Entities;
using LivestreamApp.Shared.AppSettings;
using LivestreamApp.Shared.Utilities;
using Ninject.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;

namespace LivestreamApp.Server.Streaming.Livestreams.Manager
{
    public class StreamManager : IStreamManager
    {
        private readonly ILogger _logger;
        private readonly IMapper _mapper;
        private readonly IHashGenerator _hashGenerator;
        private readonly IConfigAdapter _configAdapter;

        private readonly string _config;
        private const string Scheme = "LivestreamApp.Server.Streams.xsd";

        private Streams Streams { get; set; }

        public StreamManager(ILogger logger, IHashGenerator hashGenerator, IMapper mapper,
            IAppSettingsProvider appSettingsProvider, IConfigAdapter configAdapter)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _hashGenerator = hashGenerator ?? throw new ArgumentNullException(nameof(hashGenerator));
            _configAdapter = configAdapter ?? throw new ArgumentNullException(nameof(configAdapter));
            _config = appSettingsProvider.GetStringValue(AppSetting.StreamsConfigurationFile);
            LoadStreamsFromConfig();
        }

        private void LoadStreamsFromConfig()
        {
            Streams = _configAdapter.Load<Streams, StreamsType>(_config, Scheme);
            _logger.Debug($"Streams loaded from config ({Streams.StreamList.Count}).");
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
            stream.Id = GetNewId(stream);
            Streams.StreamList.Add(stream);
            UpdateConfig();
            _logger.Debug($"Added new stream with id {stream.Id}.");
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
                _logger.Debug($"Updated stream with id {stream.Id}.");
            }
            else
            {
                _logger.Debug($"Updating stream failed, id {stream.Id} not found.");
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
                _logger.Debug($"Deleted stream with id {id}.");
            }
            else
            {
                _logger.Debug($"Deleting stream failed, id {id} not found.");
            }
        }

        private void UpdateConfig()
        {
            _configAdapter.Save<Streams, StreamsType>(Streams, _config);
            _logger.Debug("Streams.config updated.");
        }

        private string GetNewId(Stream stream)
        {
            var hashInput = stream.Title + stream.Description + stream.CountryCode;
            var md5Hash = _hashGenerator.GetMd5Hash(hashInput);
            return md5Hash.Substring(0, 5).ToLower();
        }
    }
}
