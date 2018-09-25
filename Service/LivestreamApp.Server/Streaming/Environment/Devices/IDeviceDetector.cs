using System.Collections.Generic;

namespace LivestreamApp.Server.Streaming.Environment.Devices
{
    public interface IDeviceDetector
    {
        Dictionary<string, DeviceType> GetAvailableDevices();
    }
}