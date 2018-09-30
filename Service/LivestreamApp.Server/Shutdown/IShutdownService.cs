namespace LivestreamApp.Server.Shutdown
{
    /// <summary>
    ///     Exposes functionality to shutdown or restart the server
    /// </summary>
    public interface IShutdownService
    {
        /// <summary>
        ///     Shuts down the server immediately
        /// </summary>
        void ShutdownServer();

        /// <summary>
        ///     Restarts the server immediately
        /// </summary>
        void RestartServer();
    }
}
