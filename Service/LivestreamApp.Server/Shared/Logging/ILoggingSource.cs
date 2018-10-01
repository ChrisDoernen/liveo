using LivestreamApp.Server.Shared.Processes;
using System;

namespace LivestreamApp.Server.Shared.Logging
{
    /// <summary>
    ///     A source of log messages
    /// </summary>
    public interface ILoggingSource
    {
        /// <summary>
        ///     An event that can be subscribed to get logging data
        /// </summary>
        event EventHandler<MessageReceivedEventArgs> LogLineReceived;
    }
}
