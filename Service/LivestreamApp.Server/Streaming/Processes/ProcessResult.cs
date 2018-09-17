namespace LivestreamApp.Server.Streaming.Processes
{
    public class ProcessResult
    {
        public int ExitCode;
        public string Output;
        public string ErrorOutput;

        public ProcessResult(int exitCode, string output, string errorOutput)
        {
            ExitCode = exitCode;
            Output = output;
            ErrorOutput = errorOutput;
        }
    }
}
