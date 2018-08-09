using NLog;
using Server.Streaming;
using System.Collections.Generic;
using System.Linq;
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
        public bool IsStarted { get; private set; }

        [XmlIgnore]
        public bool HasValidAudioInput { get; private set; }

        [XmlIgnore]
        public bool IsInitialized { get; private set; }

        [XmlIgnore]
        private StreamingServerProcess streamingServer;

        [XmlIgnore]
        private ILogger logger;

        public void Validate(List<AudioInput> validAudioInputs)
        {
            if (validAudioInputs.Any(i => i.Id == this.AudioInput))
                this.HasValidAudioInput = true;
        }

        public void Initialize()
        {
            this.logger = LogManager.GetCurrentClassLogger();

            if (!this.HasValidAudioInput)
            {
                logger.Warn($"Livestream \"{this.Id}\" has no valid audio input.");
                return;
            }

            this.streamingServer = new StreamingServerProcess(this.AudioInput, this.Port);
            this.IsInitialized = true;

            logger.Info($"Initialized livestream \"{this.Id}\"");
        }

        public void Start()
        {
            if (!this.IsInitialized)
                return;

            this.streamingServer.Start();
            this.IsStarted = true;

            logger.Info($"Started livestream {this.Id}");
        }

        public void Stop()
        {
            if (!IsStarted)
                return;

            this.streamingServer.Stop();
            this.IsStarted = false;

            logger.Info($"Stopped livestream {this.Id}");
        }
    }
}
