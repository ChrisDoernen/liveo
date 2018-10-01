using LivestreamApp.Server.Shared.Processes;
using LivestreamApp.Server.Shared.ProcessSettings;
using LivestreamApp.Server.Streaming.StreamingSources;

namespace LivestreamApp.Server.Streaming.Devices
{
    /// <summary>
    ///     Represents a hardware device that can be used by a <see cref="IStreamingSource"/>
    /// </summary>
    public interface IDevice
    {
        /// <summary>
        ///     The unique id of the device
        /// </summary>
        string Id { get; }

        /// <summary>
        ///     The state of the device, i.e. if it is in use.
        /// </summary>
        DeviceState DeviceState { get; set; }

        /// <summary>
        ///     The device type, i.e. audio or video
        /// </summary>
        DeviceType DeviceType { get; }

        /// <summary>
        ///     Get process settings to stream from this device via a <see cref="IProcessAdapter"/>
        /// </summary>
        IProcessSettings StreamingProcessSettings { get; }
    }
}
