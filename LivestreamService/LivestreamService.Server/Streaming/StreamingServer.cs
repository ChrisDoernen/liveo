using LivestreamService.Server.Configuration;
using LivestreamService.Server.Entities;
using LivestreamService.Server.Environment;
using Ninject.Extensions.Logging;
using System;
using System.Collections.Generic;

namespace LivestreamService.Server.Streaming
{
    public class StreamingServer
    {
        private readonly IAudioHardware _audioHardware;
        private readonly ILivestreamsConfiguration _livestreamsConfiguration;
        private WebsocketConfiguration _websocketConfiguration;
        private readonly ILogger _logger;
        private Livestreams _livestreams;
        private List<AudioInput> _audioInputs;

        public StreamingServer(ILogger logger,
            IAudioHardware audioHardware,
            ILivestreamsConfiguration livestreamsConfiguration)
        {
            _audioHardware = audioHardware;
            _livestreamsConfiguration = livestreamsConfiguration;
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

        private void Initialize()
        {
            _audioInputs = _audioHardware.GetAudioInputs();
            _livestreams = _livestreamsConfiguration.GetAvailableStreams("Livestreams.config");

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
