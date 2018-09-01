using AutoMapper;
using LivestreamService.Server.Entities;
using LivestreamService.Server.Streaming;
using LivestreamService.Server.Utilities;
using NLog;
using System;
using System.IO;

namespace LivestreamService.Server.Configuration
{
    public class LivestreamsConfiguration
    {
        private readonly ILogger _logger;
        private const string LiveStreamsScheme = "LivestreamService.Server.Livestreams.xsd";

        public LivestreamsConfiguration()
        {
            _logger = LogManager.GetCurrentClassLogger();
        }

        public Livestreams GetAvailableStreams(string configFile)
        {
            ValidateConfigFileExistance(configFile);
            var liveStreamsType = DeserializeLiveStreams(configFile);
            var liveStreams = Mapper.Map<Livestreams>(liveStreamsType);

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
