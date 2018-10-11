using LivestreamApp.Server.Streaming.StreamingSessions.Entities;
using System.Collections.Generic;

namespace LivestreamApp.Server.Streaming.StreamingSessions.Manager
{
    /// <summary>
    ///     Provides functionality to manage sessions
    /// </summary>
    public interface ISessionManager
    {
        /// <summary>
        ///     Get sessions
        /// </summary>
        List<Session> GetSessions();

        /// <summary>
        ///     Get a specific session
        /// </summary>
        /// <param name="id">Id of the session</param>
        /// <returns>The <see cref="Session"/></returns>
        Session GetSession(string id);

        /// <summary>
        ///     Create a new session
        /// </summary>
        /// <param name="sessionBackendEntity">Entity containing the new values</param>
        void CreateSession(SessionBackendEntity sessionBackendEntity);

        /// <summary>
        ///     Update an existing session
        /// </summary>
        /// <param name="sessionBackendEntity">Entity containing the new values</param>
        void UpdateSession(SessionBackendEntity sessionBackendEntity);

        /// <summary>
        ///     Delete streaming session
        /// </summary>
        /// <param name="id">Id of the session to delete</param>
        void DeleteSession(string id);
    }
}