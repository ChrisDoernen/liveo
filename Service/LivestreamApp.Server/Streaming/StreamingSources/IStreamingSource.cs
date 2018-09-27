using LivestreamApp.Server.Streaming.Devices;
using LivestreamApp.Server.Streaming.Processes;
using System;

namespace LivestreamApp.Server.Streaming.StreamingSources
{
    /// <summary>
    ///     A source capable of streaming media
    /// </summary>
    public interface IStreamingSource
    {
        /// <summary>
        ///     The type of the streaming content
        /// </summary>
        ContentType ContentType { get; }

        /// <summary>
        ///     The device of the source
        /// </summary>
        IDevice Device { get; }

        /// <summary>
        ///     Indicates if the device is a read, valid device
        /// </summary>
        /// <returns></returns>
        bool HasValidDevice();

        /// <summary>
        ///     An event that can be subscribed to get streaming data
        /// </summary>
        event EventHandler<BytesReceivedEventArgs> BytesReceived;

        /// <summary>
        ///     Start streaming from the source
        /// </summary>
        void StartStreaming();

        /// <summary>
        ///     Stop streaming
        /// </summary>
        void StopStreaming();
    }
}
