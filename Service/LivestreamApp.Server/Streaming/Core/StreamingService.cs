using LivestreamApp.Server.Shared.WebSockets;
using LivestreamApp.Server.Streaming.Configuration;
using LivestreamApp.Server.Streaming.Devices;
using LivestreamApp.Server.Streaming.Entities;
using Ninject.Extensions.Logging;
using System;
using System.Collections.Generic;

namespace LivestreamApp.Server.Streaming.Core
{
    public class StreamingService : IStreamingService, IDisposable
    {
        private readonly ILogger _logger;
        private readonly IWebSocketServerAdapter _webSocketServerAdapter;
        private readonly ILivestreamsConfiguration _livestreamsConfiguration;
        private readonly IDeviceDetector _deviceDetector;
        private const string LivestreamsConfigFile = "Livestreams.config";
        private Livestreams _livestreams;

        public StreamingService(ILogger logger, ILivestreamsConfiguration livestreamsConfiguration,
            IDeviceDetector deviceDetector, IWebSocketServerAdapter webSocketServerAdapter)
        {
            _livestreamsConfiguration = livestreamsConfiguration;
            _webSocketServerAdapter = webSocketServerAdapter;
            _deviceDetector = deviceDetector;
            _logger = logger;

            Initialize();
            Start();
        }

        private void Initialize()
        {
            _deviceDetector.DetectAvailableDevices();
            _livestreams = _livestreamsConfiguration.GetAvailableStreams(LivestreamsConfigFile);
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
