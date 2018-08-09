using NLog;
using Server.Configuration;
using System;
using System.Collections.Generic;

namespace Server.Streaming
{
    public class StreamingServer
    {
        private static StreamingServer instance;
        private readonly LiveStreamsConfiguration liveStreamsConfiguration;
        private readonly AudioInputConfiguration audioInputConfiguration;
        private readonly ILogger logger;
        private LiveStreams livestreams;
        private List<AudioInput> audioInputs;

        public StreamingServer()
        {
            this.liveStreamsConfiguration = new LiveStreamsConfiguration();
            this.audioInputConfiguration = new AudioInputConfiguration();
            this.logger = LogManager.GetCurrentClassLogger();
        }

        public static StreamingServer GetInstance()
        {
            if (instance == null)
                instance = new StreamingServer();

            return instance;
        }

        public List<LiveStream> GetStartedLiveStreams()
        {
            if (this.livestreams == null)
                throw new ArgumentException("StreamingServerHost was not initialized.");

            return livestreams.GetStartedStreams();
        }

        public void Initialize()
        {
            this.audioInputs = this.audioInputConfiguration.GetAudioInputs();
            this.livestreams = this.liveStreamsConfiguration.GetAvailableStreams();
            this.livestreams.Validate(this.audioInputs);
            this.livestreams.Initialize();

            logger.Info("StreamingServerHost initialized.");
        }

        public void Shutdown()
        {
            throw new System.NotImplementedException();
        }

        public void StartStreams()
        {
            this.livestreams.StartStreams();
        }

        public void StartStream()
        {
            throw new System.NotImplementedException();
        }

        public void StopStream()
        {
            throw new System.NotImplementedException();
        }
    }
}
