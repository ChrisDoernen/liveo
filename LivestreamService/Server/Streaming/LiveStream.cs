using NLog;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Serialization;

namespace Server.Streaming
{
    public class LiveStream
    {
        public string Id { get; set; }
        public string Title { get; set; }
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
        private StreamingServerProcess _streamingServer;

        [XmlIgnore]
        private ILogger _logger;

        public void Validate(List<AudioInput> validAudioInputs)
        {
            if (validAudioInputs.Any(i => i.Id == this.AudioInput))
                this.HasValidAudioInput = true;
        }

        public void Initialize()
        {
            this._logger = LogManager.GetCurrentClassLogger();

            if (!this.HasValidAudioInput)
            {
                _logger.Warn($"Livestream \"{this.Id}\" has no valid audio input.");
                return;
            }

            this._streamingServer = new StreamingServerProcess(this.AudioInput, this.Port);
            this.IsInitialized = true;

            _logger.Info($"Initialized livestream \"{this.Id}\"");
        }

        public void Start()
        {
            if (!this.IsInitialized)
                return;

            this._streamingServer.Start();
            this.IsStarted = true;

            _logger.Info($"Started livestream {this.Id}");
        }

        public void Stop()
        {
            if (!IsStarted)
                return;

            this._streamingServer.Stop();
            this.IsStarted = false;

            _logger.Info($"Stopped livestream {this.Id}");
        }
    }
}
