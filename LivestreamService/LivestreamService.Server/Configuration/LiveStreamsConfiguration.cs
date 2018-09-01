using AutoMapper;
using LivestreamService.Server.Entities;
using LivestreamService.Server.Streaming;
using LivestreamService.Server.Utilities;
using Ninject.Extensions.Logging;
using System;
using System.IO;

namespace LivestreamService.Server.Configuration
{
    public class LivestreamsConfiguration
    {
        private readonly ILogger _logger;
        private readonly IMapper _mapper;
        private const string LiveStreamsScheme = "LivestreamService.Server.Livestreams.xsd";

        public LivestreamsConfiguration(ILogger logger, IMapper mapper)
        {
            _logger = logger;
            _mapper = mapper;
        }

        public Livestreams GetAvailableStreams(string configFile)
        {
            ValidateConfigFileExistance(configFile);
            var liveStreamsType = DeserializeLiveStreams(configFile);
            var liveStreams = _mapper.Map<Livestreams>(liveStreamsType);

            return liveStreams;
        }

        private LivestreamsType DeserializeLiveStreams(string configFile)
        {
            var liveStreamsType = XmlUtilities.ValidateAndDeserialize<LivestreamsType>(configFile, LiveStreamsScheme);
            return liveStreamsType;
        }

        private void ValidateConfigFileExistance(string configFile)
        {
            if (!File.Exists(configFile))
                throw new ArgumentException("The LiveStreams.xsd could not be found.");

            _logger.Info($"{configFile} exist.");
        }
    }
}
