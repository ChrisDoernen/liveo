using LivestreamApp.Server.Shared.Logging;
using LivestreamApp.Server.Shared.Processes;
using LivestreamApp.Server.Streaming.Devices;
using System;

namespace LivestreamApp.Server.Streaming.StreamingSources
{
    /// <summary>
    ///     A source capable of streaming media
    /// </summary>
    public interface IStreamingSource : ILoggingSource
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
