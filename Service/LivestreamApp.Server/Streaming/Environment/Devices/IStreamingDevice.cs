using LivestreamApp.Server.Streaming.Processes;
using System;

namespace LivestreamApp.Server.Streaming.Environment.Devices
{
    /// <summary>
    ///     Defines a contract for devices capable of streaming media
    /// </summary>
    public interface IStreamingDevice
    {
        /// <summary>
        ///     The type of the device
        /// </summary>
        DeviceType DeviceType { get; }

        /// <summary>
        ///     Indicates if the device is accessible
        /// </summary>
        bool IsValidDevice { get; }

        /// <summary>
        ///     The unique identifier of the device
        /// </summary>
        string Id { get; }

        /// <summary>
        ///     An event that can be subscribed to get streaming data
        /// </summary>
        event EventHandler<BytesReceivedEventArgs> BytesReceived;

        /// <summary>
        ///     Start streaming from the device
        /// </summary>
        void StartStreaming();

        /// <summary>
        ///     Stop streaming
        /// </summary>
        void StopStreaming();
    }
}
