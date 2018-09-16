namespace LivestreamApp.Server.Streaming.ProcessCommunication
{
    public interface IExternalProcess
    {
        event ExternalProcess.OnStdErrDataReceived ErrorDataReceived;
        event ExternalProcess.OnStdOutDataReceived OutputDataReceived;
        event ExternalProcess.OnProcessReturned ProcessExited;

        int ExecuteCommand(string command);
        void ExecuteCommandAsync(string command);
        bool IsResponding();
        bool IsRunning();
        void Kill();
    }
}