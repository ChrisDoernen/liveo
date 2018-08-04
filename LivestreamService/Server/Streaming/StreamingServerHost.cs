using NLog;
using Server.Configuration;
using System;

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

        public LiveStreams GetLiveStreams()
        {
            if (this.livestreams == null)
                throw new ArgumentException("StreamingServerHost is not initialized.");

            return livestreams;
        }

        public void Initialize()
        {
            this.livestreams = this.configurationManager.GetAvailableStreams();
            logger.Info("StreamingServerHost initialized.");
        }

        public void Shutdown()
        {
            throw new System.NotImplementedException();
        }

        public void StartStream()
        {
            throw new System.NotImplementedException();
        }

        public void StartStreams()
        {
            throw new System.NotImplementedException();
        }

        public void StopStream()
        {
            throw new System.NotImplementedException();
        }
    }
}
