using LivestreamApp.Server.Streaming.Devices;
using LivestreamApp.Server.Streaming.Streams;
using Ninject.Extensions.Logging;
using System;
using System.Collections.Generic;

namespace LivestreamApp.Server.Streaming.Core
{
    public class StreamingService : IStreamingService, IDisposable
    {
        private readonly ILogger _logger;
        private readonly IDeviceDetector _deviceDetector;
        private Streams.Streams _streams;

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
            _streams.InitializeStreams();
        }

        private void Start()
        {
            StartStreams();

            _logger.Info("StreamingService started.");
        }

        public void StartStreams()
        {
            _streams.StartStreams();
        }

        public void StopStreams()
        {
            _streams.StartStreams();
        }

        public List<Stream> GetStartedLiveStreams()
        {
            return _streams.GetStarted();
        }

        public void StartStream(string id)
        {
            _streams.StartStream(id);
        }

        public void StopStream(string id)
        {
            _streams.StopStream(id);
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
