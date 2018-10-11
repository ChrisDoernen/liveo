using LivestreamApp.Server.Streaming.StreamingSessions.Entities;

namespace LivestreamApp.Server.Streaming.StreamingSessions.Service
{
    /// <summary>
    ///     Provides functionality to control the session workflow
    /// </summary>
    public interface ISessionService
    {
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
