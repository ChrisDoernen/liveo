using LivestreamApp.Server.Streaming.StreamingSessions.Entities;
using System.Collections.Generic;

namespace LivestreamApp.Server.Streaming.StreamingSessions.Service
{
    /// <summary>
    ///     Provides functionality to manage sessions
    /// </summary>
    public interface ISessionService
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

        /// <summary>
        ///     Current session
        /// </summary>
        Session CurrentSession { get; }

        /// <summary>
        ///     Gets the current session
        /// </summary>
        /// <typeparam name="T">Either <see cref="SessionClientEntity"/>
        /// or <see cref="SessionBackendEntity"/></typeparam>
        /// <returns>The session as requested type</returns>
        T GetCurrentSession<T>();

        /// <summary>
        ///     Set current session
        /// </summary>
        /// <param name="id">Id of the current session to set</param>
        void SetCurrentSession(string id);
    }
}