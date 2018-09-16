using LivestreamApp.Server.Streaming.Environment;
using LivestreamApp.Server.Streaming.Processes;
using Ninject.Extensions.Logging;
using System.Diagnostics;

namespace LivestreamApp.Server.Streaming.Core
{
    public class AudioInputMp3Streamer
    {
        private readonly ILogger _logger;
        private readonly IProcessExecutor _processExecutor;
        private readonly AudioInput _audioInput;

        public AudioInputMp3Streamer(ILogger logger, IProcessExecutor processExecutor, AudioInput audioInput)
        {
            _logger = logger;
            _audioInput = audioInput;
            _processExecutor = processExecutor;
        }

        private ProcessStartInfo GetProcessStartInfo()
        {
            var arguments =
                "-y -f dshow " +
                $"-i audio=\"{_audioInput.Id}\" " +
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

            var processStartInfo = new ProcessStartInfo
            {
                FileName = "ffmpeg.exe",
                Arguments = arguments,
                RedirectStandardOutput = true,
                RedirectStandardError = true
            };

            return processStartInfo;
        }

        public void Start()
        {
            var processStartInfo = GetProcessStartInfo();
            _processExecutor.OutputBytesReceived += OutputBytesReceivedHandler;
            _processExecutor.ExecuteProcessAsync(processStartInfo, 4000);

            _logger.Info($"Started capturing audio on input {_audioInput.Id}.");
        }

        public void Stop()
        {
            _processExecutor.OutputBytesReceived -= OutputBytesReceivedHandler;
            _processExecutor.KillProcess();

            _logger.Info($"Stopped capturing audio on input {_audioInput.Id}.");
        }

        private void OutputBytesReceivedHandler(byte[] bytes)
        {
        }
    }
}
