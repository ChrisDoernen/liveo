using LivestreamApp.Server.Streaming.Configuration;
using LivestreamApp.Server.Streaming.Entities;
using LivestreamApp.Server.Streaming.Environment;
using LivestreamApp.Shared.AppSettings;
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
        private readonly IAudioHardware _audioHardware;
        private readonly IStreamingServiceFactory _streamingServiceFactory;
        private readonly ILivestreamsConfiguration _livestreamsConfiguration;
        private readonly IAppSettingsProvider _appSettingsProvider;
        private WebSocketServer _webSocketServer;
        private const string LivestreamsConfigFile = "Livestreams.config";
        private Livestreams _livestreams;
        private List<AudioInput> _audioInputs;

        public StreamingServerCore(ILogger logger,
            IAudioHardware audioHardware,
            IStreamingServiceFactory streamingServiceFactory,
            ILivestreamsConfiguration livestreamsConfiguration,
            IAppSettingsProvider appSettingsProvider)
        {
            _audioHardware = audioHardware;
            _streamingServiceFactory = streamingServiceFactory;
            _livestreamsConfiguration = livestreamsConfiguration;
            _appSettingsProvider = appSettingsProvider;
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
            _audioInputs = _audioHardware.GetAudioInputs();
            _livestreams = _livestreamsConfiguration.GetAvailableStreams(LivestreamsConfigFile);

        }

        private void ValidateLivestreams()
        {
            foreach (var livestream in _livestreams.Streams)
            {
                var matchingInputs = _audioInputs.Where(ai => ai.Id == livestream.AudioInput.Id).ToList();

                if (matchingInputs.Count == 1)
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
            if (_webSocketServer == null)
                throw new Exception("WebSocketServer has not been initialized.");

            foreach (var livestream in _livestreams.Streams)
            {
                if (livestream.StartOnServiceStartup && livestream.HasValidAudioInput)
                {
                    var mp3StreamingService = _streamingServiceFactory.GetAudioInputMp3Streamer(livestream.AudioInput);
                    var uri = $"/{livestream.Id}";
                    _webSocketServer.AddWebSocketService(uri, () => mp3StreamingService);
                    livestream.IsStarted = true;
                }
            }
        }

        private void StartWebSocketServer()
        {
            var ipAddress = SystemConfiguration.GetLocalIPAddress();
            var port = _appSettingsProvider.GetIntValue(AppSetting.DefaultWebSocketPort);
            _webSocketServer = new WebSocketServer();
            _webSocketServer.Start();
        }

        private async void StopWebSocketServer()
        {
            await _webSocketServer.Stop();
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
