using LivestreamApp.Server.Streaming.Devices;
using LivestreamApp.Server.Streaming.Streams.Entities;
using Ninject.Extensions.Logging;
using System;
using System.Collections.Generic;

namespace LivestreamApp.Server.Streaming.Core
{
    public class StreamingService : IStreamingService, IDisposable
    {
        private readonly ILogger _logger;
        private readonly IDeviceDetector _deviceDetector;
        private Livestreams _livestreams;

        public StreamingService(ILogger logger, IDeviceDetector deviceDetector)
        {
            _deviceDetector = deviceDetector;
            _logger = logger;

            Initialize();
            Start();
        }

        private void Initialize()
        {
            _deviceDetector.DetectAvailableDevices();
            _livestreams.InitializeStreams();
        }

        private void Start()
        {
            StartStreams();

            _logger.Info("StreamingService started.");
        }

        public void StartStreams()
        {
            _livestreams.StartStreams();
        }

        public void StopStreams()
        {
            _livestreams.StartStreams();
        }

        public List<Livestream> GetStartedLiveStreams()
        {
            return _livestreams.GetStarted();
        }

        public void StartStream(string id)
        {
            _livestreams.StartStream(id);
        }

        public void StopStream(string id)
        {
            _livestreams.StopStream(id);
        }

        public void Stop()
        {
            _logger.Info("StreamingService stopped.");
        }

        public void Dispose()
        {
            Stop();
            _logger.Info("StreamingService disposed.");
        }
    }
}
