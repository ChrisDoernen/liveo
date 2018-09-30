using LivestreamApp.Server.Shared.Logging;
using LivestreamApp.Server.Streaming.StreamingSources;

namespace LivestreamApp.Server.Shared.WebSockets
{
    /// <summary>
    ///     Exposes functionality to get web socket services
    /// </summary>
    public interface IWebSocketServiceFactory
    {
        /// <summary>
        ///     Get a streaming web socket service instance
        /// </summary>
        /// <param name="source">The streaming source for the service</param>
        /// <returns>A StreamingWebSocketService</returns>
        StreamingWebSocketService GetStreamingWebSocketervice(IStreamingSource source);

        /// <summary>
        ///     Get a logging web socket service instance
        /// </summary>
        /// <param name="source">The logging source for the service.</param>
        /// <returns></returns>
        LoggingWebSocketService GetLoggingWebSocketervice(ILoggingSource source);
    }
}