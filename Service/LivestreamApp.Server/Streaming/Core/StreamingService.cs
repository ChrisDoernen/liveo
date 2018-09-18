using LivestreamApp.Server.Streaming.Environment;
using LivestreamApp.Server.Streaming.Processes;
using Ninject.Extensions.Logging;
using System;

namespace LivestreamApp.Server.Streaming.Core
{
    public class StreamingService : IStreamingService
    {
        private readonly ILogger _logger;
        private readonly IProcessAdapter _processAdapter;
        private readonly AudioDevice _audioDevice;
        private const string FileName = "ffmpeg.exe";

        public StreamingService(ILogger logger, IProcessAdapter processAdapter, AudioDevice audioDevice)
        {
            _logger = logger;
            _audioDevice = audioDevice;
            _processAdapter = processAdapter;
        }

        private string GetArguments()
        {
            return
                "-y -f dshow " +
                $"-i audio=\"{_audioDevice.Id}\" " +
                "-rtbufsize 64 " +
                "-probesize 64 " +
                "-acodec libmp3lame " +
                "-ab 320k " +
                "-ar 44100 " +
                "-ac 1 " +
                "-reservoir 0 " +
                "-f mp3 " +
                "-hide_banner " +
                "-fflags " +
                "+nobuffer " +
                "pipe:1";
        }

        public void Start()
        {
            var arguments = GetArguments();
            _processAdapter.OutputBytesReceived += OutputBytesReceivedHandler;
            _processAdapter.ExecuteAndReadAsync(FileName, arguments, 4000);

            _logger.Info($"Started capturing audio on input {_audioDevice.Id}.");
        }

        public void Stop()
        {
            _processAdapter.OutputBytesReceived -= OutputBytesReceivedHandler;
            _processAdapter.KillProcess();

            _logger.Info($"Stopped capturing audio on input {_audioDevice.Id}.");
        }

        private void OutputBytesReceivedHandler(object sender, EventArgs e)
        {
        }
    }
}
