using LivestreamApp.Server.Streaming.Environment.Devices;
using LivestreamApp.Server.Streaming.WebSockets;
using Ninject.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;

namespace LivestreamApp.Server.Streaming.Entities
{
    public class Livestream
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string CountryCode { get; set; }
        public string InputSource { get; set; }
        public bool StartOnServiceStartup { get; set; }
        public bool IsStarted { get; private set; }

        private bool IsInitialized { get; set; }
        private bool HasValidAudioInput { get; set; }
        private AudioDevice Device { get; set; }

        private readonly IWebSocketServerAdapter _webSocketServerAdapter;
        private readonly ILogger _logger;
        private string _path;

        public Livestream(ILogger logger, IWebSocketServerAdapter webSocketServerAdapter)
        {
            _logger = logger;
            _webSocketServerAdapter = webSocketServerAdapter;
        }

        public void Initialize(List<AudioDevice> audioDevices)
        {
            ValidateAndAssignAudioDevice(audioDevices);
            _path = $"/{Id}";
            IsInitialized = true;
        }

        public void ValidateAndAssignAudioDevice(List<AudioDevice> audioDevices)
        {
            var matchingDevice = audioDevices.FirstOrDefault(d => d.Id.Equals(InputSource));
            if (matchingDevice != null)
            {
                Device = matchingDevice;
                HasValidAudioInput = true;
            }
            else
            {
                _logger.Warn($"Livestream {Id} has invalid audio input.");
            }
        }

        public void Start()
        {
            if (IsInitialized && HasValidAudioInput && StartOnServiceStartup)
            {
                Device.StartStreaming();
                _webSocketServerAdapter.AddStreamingWebSocketService(_path, Device);
                IsStarted = true;
            }
        }

        public void Stop()
        {
            if (IsStarted)
            {
                Device.StopStreaming();
                _webSocketServerAdapter.RemoveWebSocketService(_path);
                IsStarted = false;
            }
        }
    }
}
