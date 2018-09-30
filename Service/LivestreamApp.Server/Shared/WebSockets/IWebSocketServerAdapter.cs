using LivestreamApp.Server.Streaming.StreamingSources;

namespace LivestreamApp.Server.Shared.WebSockets
{
    /// <summary>
    ///     Exposes access to a web socket server
    /// </summary>
    public interface IWebSocketServerAdapter
    {
        /// <summary>
        ///     Start the web socket server
        /// </summary>
        void StartWebSocketServer();

        /// <summary>
        ///     Stop the web socket server
        /// </summary>
        void StopWebSocketServer();

        /// <summary>
        ///     Add a streaming web socket service
        /// </summary>
        /// <param name="path">The path to publish</param>
        /// <param name="source">A streaming source</param>
        void AddStreamingWebSocketService(string path, IStreamingSource source);

        /// <summary>
        ///     Add a logging web socket service
        /// </summary>
        /// <param name="path">The path to publish</param>
        /// <param name="source">A logging source</param>
        void AddLogginggWebSocketService(string path, ILoggingSource source);

        /// <summary>
        ///     Remove a web socket service
        /// </summary>
        /// <param name="path">The path to the service</param>
        void RemoveWebSocketService(string path);
    }
}
