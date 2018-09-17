using System;
using System.Diagnostics;

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
        /// <param name="processStartInfo">Contains information about the process</param>
        /// <param name="output">The output from the process</param>
        /// <param name="errorOutput">The error ouput from the process</param>
        /// <returns>The exit code returned from the process</returns>
        ProcessResult ExecuteAndReadSync(ProcessStartInfo processStartInfo);

        /// <summary>
        ///     Executes the specified process asynchronously
        /// </summary>
        /// <param name="processStartInfo">Contains information about the process</param>
        void ExecuteAndReadAsync(ProcessStartInfo processStartInfo);

        /// <summary>
        ///     Executes the specified process asynchronously with enabled binary output
        ///     using the domain specific buffer size
        /// </summary>
        /// <param name="processStartInfo">Contains information about the process</param>
        /// <param name="bufferSize">The size of the internal buffer</param>
        void ExecuteAndReadAsync(ProcessStartInfo processStartInfo, int bufferSize);

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