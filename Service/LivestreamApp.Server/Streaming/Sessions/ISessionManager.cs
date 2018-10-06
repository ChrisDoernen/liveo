using LivestreamApp.Server.Streaming.Sessions.Entities;

namespace LivestreamApp.Server.Streaming.Sessions
{
    /// <summary>
    ///     Provides functionality to manage sessions
    /// </summary>
    public interface ISessionManager
    {
        /// <summary>
        ///     Get sessions
        /// </summary>
        Sessions Sessions { get; }

        /// <summary>
        ///     Update an existing session or adds a new one
        /// </summary>
        /// <param name="sessionBackendEntity">The session entity containing the new values</param>
        void UpdateSession(SessionBackendEntity sessionBackendEntity);

        /// <summary>
        ///     Delete streaming session
        /// </summary>
        /// <param name="id">Id of the session to delete</param>
        void DeleteSession(string id);

        /// <summary>
        ///     Get sessions from config file
        /// </summary>
        void LoadSessionsFromConfig();
    }
}