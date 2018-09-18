using LivestreamApp.Server.Streaming.Configuration;
using LivestreamApp.Server.Streaming.Entities;
using LivestreamApp.Server.Streaming.Environment;
using LivestreamApp.Shared.Network;
using Ninject.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using WebSocketSharp.Server;

namespace LivestreamApp.Server.Streaming.Core
{
    public class StreamingServerCore : IStreamingServerCore
    {
        private readonly ILogger _logger;
        private readonly IHardware _hardware;
        private readonly IStreamingServiceFactory _streamingServiceFactory;
        private readonly ILivestreamsConfiguration _livestreamsConfiguration;
        private readonly IUriConfiguration _uriConfiguration;
        private WebSocketServer _webSocketServer;
        private const string LivestreamsConfigFile = "Livestreams.config";
        private Livestreams _livestreams;
        private List<AudioDevice> _audioDevices;

        public StreamingServerCore(ILogger logger,
            IHardware hardware,
            IStreamingServiceFactory streamingServiceFactory,
            ILivestreamsConfiguration livestreamsConfiguration,
            IUriConfiguration uriConfiguration)
        {
            _hardware = hardware;
            _streamingServiceFactory = streamingServiceFactory;
            _livestreamsConfiguration = livestreamsConfiguration;
            _uriConfiguration = uriConfiguration;
            _logger = logger;

            Start();
        }

        public List<Livestream> GetStartedLiveStreams()
        {
            if (_livestreams == null)
                throw new ArgumentException("StreamingServerCore is not initialized.");

            var startedLivestreams = _livestreams.Streams.Where(ls => ls.IsStarted).ToList();
            return startedLivestreams;
        }

        private void Start()
        {
            Initialize();
            StartWebSocketServer();
            ValidateLivestreams();
            StartStreams();

            _logger.Info("StreamingServerCore started.");
        }

        private void Initialize()
        {
            _audioDevices = _hardware.GetAudioDevices();
            _livestreams = _livestreamsConfiguration.GetAvailableStreams(LivestreamsConfigFile);

        }

        private void ValidateLivestreams()
        {
            foreach (var livestream in _livestreams.Streams)
            {
                var matchingDevices = _audioDevices.Where(ai => ai.Id == livestream.AudioDevice.Id).ToList();

                if (matchingDevices.Count == 1)
                {
                    livestream.HasValidAudioInput = true;
                }
                else
                {
                    _logger.Warn($"Livestream {livestream.Id} has invalid audio input - will not be started.");
                }

                livestream.IsInitialized = true;
            }
        }

        public void StartStreams()
        {
            foreach (var livestream in _livestreams.Streams)
            {
                if (livestream.StartOnServiceStartup && livestream.HasValidAudioInput)
                {
                    var mp3StreamingService = _streamingServiceFactory.GetAudioInputMp3Streamer(livestream.AudioDevice);
                    var path = $"/{livestream.Id}";
                    livestream.IsStarted = true;
                }
            }
        }

        private void StartWebSocketServer()
        {
            var wsUri = _uriConfiguration.GetWsUri();
            _webSocketServer = new WebSocketServer(wsUri);
            _webSocketServer.Start();
        }

        private void StopWebSocketServer()
        {
            _webSocketServer.Stop();
        }

        public void Stop()
        {

        }

        public void Shutdown()
        {
        }

        public void StartStream(string id)
        {
        }

        public void StopStream(string id)
        {
        }

        public void StopStreams()
        {
            throw new NotImplementedException();
        }

        public void ShutdownServer()
        {
        }
    }
}
