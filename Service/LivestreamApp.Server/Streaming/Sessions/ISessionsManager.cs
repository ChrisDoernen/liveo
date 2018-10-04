using LivestreamApp.Server.Streaming.Sessions.Entities;

namespace LivestreamApp.Server.Streaming.Sessions
{
    /// <summary>
    ///     Provides functionality to manage streaming sessions
    /// </summary>
    public interface ISessionsManager
    {
        /// <summary>
        ///     Get streaming sessions
        /// </summary>
        StreamingSessions StreamingSessions { get; }

        /// <summary>
        ///     Update an existing session or adds a new one
        /// </summary>
        /// <param name="streamingSession">The streamin session entity containing the new values</param>
        void UpdateStreaminSession(StreamingSessionBackendEntity streamingSession);

        /// <summary>
        ///     Delete streaming session
        /// </summary>
        /// <param name="id">Id of the streaming session to delete</param>
        void DeleteStreamingSession(string id);

        /// <summary>
        ///     Get streaming sessions from config file
        /// </summary>
        void GetStreamingSessionsFromConfig();
    }
}