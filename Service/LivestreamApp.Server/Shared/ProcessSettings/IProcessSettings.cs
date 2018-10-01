using LivestreamApp.Server.Shared.Processes;

namespace LivestreamApp.Server.Shared.ProcessSettings
{
    /// <summary>
    ///     Implementation provides settings to be used with an <see cref="IProcessAdapter"/>
    /// </summary>
    public interface IProcessSettings
    {
        /// <summary>
        ///     Name of the file to be executed
        /// </summary>
        string FileName { get; }

        /// <summary>
        ///     Arguments to be applied to process execution
        /// </summary>
        string Arguments { get; }

        /// <summary>
        ///     Optional buffer size to be used when reading binary standard output
        ///     from the process is intended.
        /// </summary>
        int? BufferSize { get; }
    }
}
