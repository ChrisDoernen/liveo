using System.Diagnostics;

namespace LivestreamApp.Server.Streaming.Processes
{
    public interface IProcessExecutor
    {
        event ProcessExecutor.OnStdOutBytesReceived OutputBytesReceived;
        event ProcessExecutor.OnStdErrDataReceived ErrorDataReceived;
        event ProcessExecutor.OnStdOutDataReceived OutputDataReceived;
        event ProcessExecutor.OnProcessReturned ProcessExited;

        int ExecuteProcess(ProcessStartInfo processStartInfo);
        void ExecuteProcessAsync(ProcessStartInfo processStartInfo, int bufferSize);
        bool IsResponding();
        bool IsRunning();
        void KillProcess();
    }
}