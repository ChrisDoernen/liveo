using NLog;
using Server.Streaming;
using System.Xml.Serialization;

namespace Server
{
    public class LiveStream
    {
        public string Id { get; set; }
        public string Description { get; set; }
        public string CountryCode { get; set; }
        public string AudioInput { get; set; }
        public int Port { get; set; }
        public bool StartOnServiceStartup { get; set; }

        [XmlIgnore]
        public bool IsStarted { get; private set; } = false;

        [XmlIgnore]
        private StreamingServer streamingServer;

        [XmlIgnore]
        private ILogger logger;

        public void Initialize()
        {
            this.logger = LogManager.GetCurrentClassLogger();
            this.streamingServer = new StreamingServer(this.AudioInput, this.Port);

            logger.Info($"Initialized livestream {this.Id}");
        }

        public void Start()
        {
            this.streamingServer.Start();
            this.IsStarted = true;

            logger.Info($"Started livestream {this.Id}");
        }

        public void Stop()
        {
            this.streamingServer.Stop();
            this.IsStarted = false;

            logger.Info($"Stopped livestream {this.Id}");
        }
    }
}
