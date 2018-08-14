using NLog;
using Server.Configuration;
using System;
using System.Collections.Generic;

namespace Server.Streaming
{
    public class StreamingServer
    {
        private static StreamingServer _instance;
        private readonly LiveStreamsConfiguration _liveStreamsConfiguration;
        private readonly AudioInputConfiguration _audioInputConfiguration;
        private readonly ILogger _logger;
        private LiveStreams _livestreams;
        private List<AudioInput> _audioInputs;

        public StreamingServer()
        {
            _liveStreamsConfiguration = new LiveStreamsConfiguration();
            _audioInputConfiguration = new AudioInputConfiguration();
            _logger = LogManager.GetCurrentClassLogger();
        }

        public static StreamingServer GetInstance()
        {
            return _instance ?? (_instance = new StreamingServer());
        }

        public List<LiveStream> GetStartedLiveStreams()
        {
            if (_livestreams == null)
                throw new ArgumentException("StreamingServerHost was not initialized.");

            return _livestreams.GetStartedStreams();
        }

        public void Initialize()
        {
            _audioInputs = _audioInputConfiguration.GetAudioInputs();
            _livestreams = _liveStreamsConfiguration.GetAvailableStreams();
            _livestreams.Validate(_audioInputs);
            _livestreams.Initialize();

            _logger.Info("StreamingServerHost initialized.");
        }

        public void Shutdown()
        {
            throw new NotImplementedException();
        }

        public void StartStreams()
        {
            _livestreams.StartStreams();
        }

        public void StartStream()
        {
            throw new NotImplementedException();
        }

        public void StopStream()
        {
            throw new NotImplementedException();
        }
    }
}
