namespace LivestreamApp.Server.Streaming.Processes
{
    /// <summary>
    ///     Contains settings to be used with an <see cref="IProcessAdapter"/>
    /// </summary>
    public class ProcessSettings
    {
        /// <summary>
        ///     Name of the file to be executed
        /// </summary>
        public string FileName { get; }

        /// <summary>
        ///     Arguments to be applied to process execution
        /// </summary>
        public string Arguments { get; }

        /// <summary>
        ///     Optional buffer size to be used when reading binary standard output
        ///     from the process is intended.
        /// </summary>
        public int? BufferSize { get; }

        public ProcessSettings(string fileName, string arguments, int? bufferSize)
        {
            FileName = fileName;
            Arguments = arguments;
            BufferSize = bufferSize;
        }

        public ProcessSettings(string fileName, string arguments)
        {
            FileName = fileName;
            Arguments = arguments;
        }
    }
}
