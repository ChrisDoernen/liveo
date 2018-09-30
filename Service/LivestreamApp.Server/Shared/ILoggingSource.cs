using System;
using System.Diagnostics;

namespace LivestreamApp.Server.Shared
{
    /// <summary>
    ///     A source of log messages
    /// </summary>
    public interface ILoggingSource
    {
        /// <summary>
        ///     An event that can be subscribed to get logging data
        /// </summary>
        event EventHandler<DataReceivedEventArgs> LogLineReceived;
    }
}
