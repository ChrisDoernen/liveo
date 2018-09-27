using System.Collections.Generic;

namespace LivestreamApp.Server.Streaming.Devices
{
    /// <summary>
    ///     Implementations of IDeviceDetector can detect audio and
    ///     video devices available in the system
    /// </summary>
    public interface IDeviceDetector
    {
        /// <summary>
        ///     A list of available devices, eiter audio or video devices
        /// </summary>
        List<IDevice> Devices { get; }

        /// <summary>
        ///     Triggeres the device detection
        /// </summary>
        void DetectAvailableDevices();

        /// <summary>
        ///     Gets a device by its id
        /// </summary>
        /// <param name="id">Id of the device</param>
        /// <returns>The device. If not found, an <see cref="UnknownDevice"/> is returned.</returns>
        IDevice GetDeviceById(string id);
    }
}
