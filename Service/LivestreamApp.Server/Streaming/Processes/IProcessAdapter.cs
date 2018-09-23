﻿using LivestreamApp.Server.Streaming.Streamer;
using System;
using System.Diagnostics;

namespace LivestreamApp.Server.Streaming.Processes
{
    public interface IProcessAdapter
    {
        /// <summary>
        ///     Fires with the "on data" event of the process
        /// </summary>
        event EventHandler<BytesReceivedEventArgs> OutputBytesReceived;

        /// <summary>
        ///     Fires when a line of standard error output is received
        /// </summary>
        event EventHandler<DataReceivedEventArgs> ErrorDataReceived;

        /// <summary>
        ///     Fires when a line of standard output is received
        /// </summary>
        event EventHandler<DataReceivedEventArgs> OutputDataReceived;

        /// <summary>
        ///     Fires when the process has exited
        /// </summary>
        event EventHandler ProcessExited;

        /// <summary>
        ///     Executes the specified process synchronously.
        /// </summary>
        /// <param name="settings">Object providing settings for process execution</param>
        /// <returns>ProcessResult</returns>
        ProcessResult ExecuteAndReadSync(ProcessSettings settings);

        /// <summary>
        ///     Executes the specified process asynchronously
        /// </summary>
        /// <param name="processSettings">Object providing settings for process execution</param>
        void ExecuteAndReadAsync(ProcessSettings processSettings);

        /// <summary>
        ///     Executes the specified process asynchronously with enabled binary output
        ///     internally using the domain specific buffer size for reading the
        ///     process data output
        /// </summary>
        /// <param name="processSettings">Object providing settings for process execution</param>
        void ExecuteAndReadBinaryAsync(ProcessSettings processSettings);

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