using LivestreamService.Server.Configuration;
using Ninject.Extensions.Logging;
using System;
using System.Collections.Generic;

namespace LivestreamService.Server.Streaming
{
    public class StreamingServer
    {
        private static StreamingServer _instance;
        private readonly LivestreamsConfiguration _livestreamsConfiguration;
        private readonly AudioInputConfiguration _audioInputConfiguration;
        private WebsocketConfiguration _websocketConfiguration;
        private readonly ILogger _logger;
        private Livestreams _livestreams;
        private List<AudioInput> _audioInputs;

        public StreamingServer(ILogger logger,
            LivestreamsConfiguration livestreamsConfiguration,
            AudioInputConfiguration audioInputConfiguration)
        {
            _livestreamsConfiguration = livestreamsConfiguration;
            _audioInputConfiguration = audioInputConfiguration;
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
