using LivestreamApp.Server.Streaming.Processes;
using System;

namespace LivestreamApp.Server.Streaming.Environment.Devices
{
    public class InvalidDevice : IStreamingDevice
    {
        public DeviceType DeviceType { get; } = DeviceType.Unknown;
        public bool IsValidDevice { get; } = false;
        public string Id { get; } = "";
        public event EventHandler<BytesReceivedEventArgs> BytesReceived;

        public void StartStreaming()
        {
            throw new Exception("Can not start streaming: Device was not found.");
        }

        public void StopStreaming()
        {
            throw new Exception("Streaming was not started: Device was not found.");
        }
    }
}
