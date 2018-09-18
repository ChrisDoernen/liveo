using System;

namespace LivestreamApp.Server.Streaming.Processes
{
    public interface IProcessAdapter
    {
        /// <summary>
        ///     Fires with the "on data" event of the process
        /// </summary>
        event EventHandler OutputBytesReceived;

        /// <summary>
        ///     Fires when a line of standard error output is received
        /// </summary>
        event EventHandler ErrorDataReceived;

        /// <summary>
        ///     Fires when a line of standard output is received
        /// </summary>
        event EventHandler OutputDataReceived;

        /// <summary>
        ///     Fires when the process has exited
        /// </summary>
        event EventHandler ProcessExited;

        /// <summary>
        ///     Executes the specified process synchronously.
        /// </summary>
        /// <param name="file">File to execute</param>
        /// <param name="arguments">Arguments to apply</param>
        /// <returns>ProcessResult</returns>
        ProcessResult ExecuteAndReadSync(string file, string arguments);

        /// <summary>
        ///     Executes the specified process asynchronously
        /// </summary>
        /// <param name="file">File to execute</param>
        /// <param name="arguments">Arguments to apply</param>
        void ExecuteAndReadAsync(string file, string arguments);

        /// <summary>
        ///     Executes the specified process asynchronously with enabled binary output
        ///     using the domain specific buffer size
        /// </summary>
        /// <param name="file">File to execute</param>
        /// <param name="arguments">Arguments to apply</param>
        /// <param name="bufferSize">The size of the internal buffer</param>
        void ExecuteAndReadAsync(string file, string arguments, int bufferSize);

        /// <summary>
        ///     Indicates if the started process is responding
        /// </summary>
        bool IsResponding();

        /// <summary>
        ///     Indicates if the started process is running
        /// </summary>
        bool IsRunning();

        /// <summary>
        ///     Kills the process
        /// </summary>
        void KillProcess();
    }
}