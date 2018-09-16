using LivestreamApp.Server.Streaming.Configuration;
using LivestreamApp.Server.Streaming.Entities;
using LivestreamApp.Server.Streaming.Environment;
using Ninject.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;

namespace LivestreamApp.Server.Streaming.Core
{
    public class StreamingServerCore : IStreamingServerCore
    {
        private readonly IAudioHardware _audioHardware;
        private readonly IAudioInputStreamerFactory _audioInputStreamerFactory;
        private readonly ILivestreamsConfiguration _livestreamsConfiguration;
        private readonly ILogger _logger;
        private const string LivestreamsConfigFile = "Livestreams.config";
        private Livestreams _livestreams;
        private List<AudioInput> _audioInputs;

        public StreamingServerCore(ILogger logger,
            IAudioHardware audioHardware,
            IAudioInputStreamerFactory audioInputStreamerFactory,
            ILivestreamsConfiguration livestreamsConfiguration)
        {
            _audioHardware = audioHardware;
            _audioInputStreamerFactory = audioInputStreamerFactory;
            _livestreamsConfiguration = livestreamsConfiguration;
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
            foreach (var livestream in _livestreams.Streams)
            {
                if (livestream.StartOnServiceStartup && livestream.HasValidAudioInput)
                {
                    var streamer = _audioInputStreamerFactory.GetAudioInputMp3Streamer(livestream.AudioInput);

                    livestream.IsStarted = true;
                }
            }
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
