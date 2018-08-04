using NLog;
using Server.Configuration;
using System;
using System.Collections.Generic;

namespace Server.Streaming
{
    public class StreamingServerHost
    {
        private static StreamingServerHost instance;
        private readonly LiveStreamsConfigurationManager configurationManager;
        private readonly ILogger logger;
        private LiveStreams livestreams;

        public StreamingServerHost()
        {
            this.configurationManager = new LiveStreamsConfigurationManager();
            this.logger = LogManager.GetCurrentClassLogger();

            logger.Info("StreamingServerHost instanciated.");
        }

        public static StreamingServerHost GetInstance()
        {
            if (instance == null)
                instance = new StreamingServerHost();

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
            this.livestreams = this.configurationManager.GetAvailableStreams();
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
