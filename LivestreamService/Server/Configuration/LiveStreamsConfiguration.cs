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
        private const string LiveStreamsConfig = "LiveStreams.config";
        private const string LiveStreamsScheme = "LiveStreams.xsd";

        public LivestreamsConfiguration()
        {
            _logger = LogManager.GetCurrentClassLogger();
        }

        public LiveStreams GetAvailableStreams()
        {
            ValidateConfigFileExistance();
            var liveStreamsType = DeserializeLiveStreams();
            var liveStreams = MapLivestreams(liveStreamsType);

            return liveStreams;
        }

        private LiveStreams MapLivestreams(LivestreamsType liveStreamsType)
        {
            return Mapper.Map<LiveStreams>(liveStreamsType);
        }

        private LivestreamsType DeserializeLiveStreams()
        {
            var liveStreamsType = XmlUtilities.ValidateAndDeserialize<LivestreamsType>(LiveStreamsConfig, LiveStreamsScheme);
            return liveStreamsType;
        }

        private void ValidateConfigFileExistance()
        {
            if (!File.Exists(LiveStreamsConfig))
                throw new ArgumentException("The LiveStreams.xsd could not be found.");

            _logger.Info($"{LiveStreamsConfig} exist.");
        }
    }
}
