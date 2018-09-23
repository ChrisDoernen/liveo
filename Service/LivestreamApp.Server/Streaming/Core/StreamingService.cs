﻿using LivestreamApp.Server.Streaming.Configuration;
using LivestreamApp.Server.Streaming.Entities;
using LivestreamApp.Server.Streaming.Environment;
using LivestreamApp.Server.Streaming.Environment.Devices;
using LivestreamApp.Server.Streaming.WebSockets;
using LivestreamApp.Shared.Network;
using Ninject.Extensions.Logging;
using System;
using System.Collections.Generic;

namespace LivestreamApp.Server.Streaming.Core
{
    public class StreamingService : IStreamingService, IDisposable
    {
        private readonly ILogger _logger;
        private readonly IHardware _hardware;
        private readonly IWebSocketServerAdapter _webSocketServerAdapter;
        private readonly ILivestreamsConfiguration _livestreamsConfiguration;
        private const string LivestreamsConfigFile = "Livestreams.config";
        private Livestreams _livestreams;
        private List<AudioDevice> _audioDevices;

        public StreamingService(ILogger logger,
            IHardware hardware,
            IDeviceManager deviceManager,
            ILivestreamsConfiguration livestreamsConfiguration,
            IWebSocketServerAdapter webSocketServerAdapter,
            IUriConfiguration uriConfiguration)
        {
            _hardware = hardware;
            _livestreamsConfiguration = livestreamsConfiguration;
            _webSocketServerAdapter = webSocketServerAdapter;
            _logger = logger;

            Start();
        }

        public List<Livestream> GetStartedLiveStreams()
        {
            if (_livestreams == null)
                throw new ArgumentException("StreamingService is not initialized.");

            return _livestreams.GetStarted();
        }

        private void Start()
        {
            Initialize();
            _webSocketServerAdapter.StartWebSocketServer();
            StartStreams();

            _logger.Info("StreamingService started.");
        }

        private void Initialize()
        {
            _audioDevices = _hardware.GetAudioDevices();
            _livestreams = _livestreamsConfiguration.GetAvailableStreams(LivestreamsConfigFile);
            _livestreams.InitializeStreams(_audioDevices);
        }


        public void StartStreams()
        {
            _livestreams.StartStreams();
        }

        public void StopStreams()
        {
            _livestreams.StartStreams();
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
            _webSocketServerAdapter.StopWebSocketServer();
            _logger.Info("StreamingService stopped.");
        }

        public void Dispose()
        {
            _logger.Info("StreamingService disposed.");
        }
    }
}
