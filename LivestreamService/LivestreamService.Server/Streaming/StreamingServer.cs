using LivestreamService.Server.Configuration;
using LivestreamService.Server.Entities;
using Ninject.Extensions.Logging;
using System;
using System.Collections.Generic;

namespace LivestreamService.Server.Streaming
{
    public class StreamingServer
    {
        private static StreamingServer _instance;
        private readonly LivestreamsConfiguration _livestreamsConfiguration;
        private readonly AudioConfiguration _audioConfiguration;
        private WebsocketConfiguration _websocketConfiguration;
        private readonly ILogger _logger;
        private Livestreams _livestreams;
        private List<AudioInput> _audioInputs;

        public StreamingServer(ILogger logger,
            LivestreamsConfiguration livestreamsConfiguration,
            AudioConfiguration audioConfiguration)
        {
            _livestreamsConfiguration = livestreamsConfiguration;
            _audioConfiguration = audioConfiguration;
            _logger = logger;
        }

        public List<Livestream> GetStartedLiveStreams()
        {
            if (_livestreams == null)
                throw new ArgumentException("StreamingServerHost was not initialized.");


            return null;
        }

        public void Start()
        {
            Initialize();
        }

        public void Stop()
        {

        }

        public void Initialize()
        {
            var audioInputs = _audioConfiguration.GetAudioInputs();

            var livestreams = _livestreamsConfiguration.GetAvailableStreams("Livestreams.config");
            _logger.Info("StreamingServerHost initialized.");
        }

        public void Shutdown()
        {
        }

        public void StartStreams()
        {
        }

        public void StartStream(string id)
        {
        }

        public void StopStream(string id)
        {
        }

        public void ShutdownServer()
        {
        }
    }
}
