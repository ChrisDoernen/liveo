namespace LivestreamApp.Server.Streaming.Configuration
{
    /// <summary>
    ///     Provides configuration for streaming
    /// </summary>
    public interface IStreamingConfiguration
    {
        /// <summary>
        ///     The name of the file to execute in order to start a streaming process.
        /// </summary>
        string FileName { get; }

        /// <summary>
        ///     Get arguments to apply to the streaming process.
        /// </summary>
        /// <param name="deviceId">The identifier of the device to capture media on.</param>
        /// <returns>A string containing the arguments</returns>
        string GetArguments(string deviceId);

        /// <summary>
        ///     The buffer size used to inernally read the stdout data of the process.
        /// </summary>
        int BufferSize { get; }
    }
}