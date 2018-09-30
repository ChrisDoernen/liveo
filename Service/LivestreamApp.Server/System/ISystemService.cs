namespace LivestreamApp.Server.System
{
    /// <summary>
    ///     Exposes functionality to interact with the OS
    /// </summary>
    public interface ISystemService
    {
        /// <summary>
        ///     Shuts down the system
        /// </summary>
        void ShutdownServer();

        /// <summary>
        ///     Restarts the system
        /// </summary>
        void RestartServer();
    }
}
