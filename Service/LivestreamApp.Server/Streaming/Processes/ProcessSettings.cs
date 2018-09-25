namespace LivestreamApp.Server.Streaming.Processes
{
    public class ProcessSettings : IProcessSettings
    {
        public string FileName { get; }
        public string Arguments { get; }
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
