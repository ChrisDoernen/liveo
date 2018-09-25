using LivestreamApp.Server.Streaming.Environment.Devices;
using LivestreamApp.Server.Streaming.WebSockets;
using Ninject.Extensions.Logging;

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
        private bool HasValidInputSource { get; set; }
        private IStreamingDevice Device { get; set; }

        private readonly IWebSocketServerAdapter _webSocketServerAdapter;
        private readonly IStreamingDeviceManager _streamingDeviceManager;
        private readonly ILogger _logger;
        private string _path;

        public Livestream(ILogger logger, IWebSocketServerAdapter webSocketServerAdapter,
            IStreamingDeviceManager streamingDeviceManager)
        {
            _logger = logger;
            _streamingDeviceManager = streamingDeviceManager;
            _webSocketServerAdapter = webSocketServerAdapter;
        }

        public void Initialize()
        {
            Device = _streamingDeviceManager.GetDevice(Id);
            HasValidInputSource = Device.IsValidDevice;
            _path = $"/{Id}";
            IsInitialized = true;
        }

        public void Start()
        {
            if (IsInitialized && HasValidInputSource && StartOnServiceStartup)
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
