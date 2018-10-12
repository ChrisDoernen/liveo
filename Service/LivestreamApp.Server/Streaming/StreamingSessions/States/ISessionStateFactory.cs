namespace LivestreamApp.Server.Streaming.StreamingSessions.States
{
    /// <summary>
    ///     Provides funtionality to get session states from kernel
    /// </summary>
    public interface ISessionStateFactory
    {
        /// <summary>
        ///     Get a specific session state with a session
        /// </summary>
        /// <typeparam name="T">The session state to retrieve</typeparam>
        /// <param name="session">The session reference</param>
        /// <returns>The reequested session state as <see cref="ISessionState"/></returns>
        ISessionState GetSessionState<T>(ISession session) where T : ISessionState;
    }
}