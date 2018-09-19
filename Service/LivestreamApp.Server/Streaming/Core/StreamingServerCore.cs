using LivestreamApp.Server.Streaming.Configuration;
using LivestreamApp.Server.Streaming.Entities;
using LivestreamApp.Server.Streaming.Environment;
using LivestreamApp.Shared.Network;
using Ninject.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;

namespace LivestreamApp.Server.Streaming.Core
{
    public class StreamingServerCore : IStreamingServerCore, IDisposable
    {
        private readonly ILogger _logger;
        private readonly IHardware _hardware;
        private readonly ILivestreamsConfiguration _livestreamsConfiguration;
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
            StartStreams();

            _logger.Info("StreamingServerCore started.");
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

        }

        public void ShutdownServer()
        {
        }

        public void Dispose()
        {
            _logger.Info("dispose core");
        }
    }
}
