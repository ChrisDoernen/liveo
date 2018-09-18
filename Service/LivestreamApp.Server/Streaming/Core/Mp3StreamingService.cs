using LivestreamApp.Server.Streaming.Environment;
using LivestreamApp.Server.Streaming.Processes;
using Ninject.Extensions.Logging;
using System;
using System.Diagnostics;

namespace LivestreamApp.Server.Streaming.Core
{
    public class Mp3StreamingService : IMp3StreamingService
    {
        private readonly ILogger _logger;
        private readonly IProcessAdapter _processAdapter;
        private readonly AudioDevice _audioDevice;

        public Mp3StreamingService(ILogger logger, IProcessAdapter processAdapter, AudioDevice audioDevice)
        {
            _logger = logger;
            _audioDevice = audioDevice;
            _processAdapter = processAdapter;
        }

        private ProcessStartInfo GetProcessStartInfo()
        {
            var arguments =
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

            var processStartInfo = new ProcessStartInfo
            {
                FileName = "ffmpeg.exe",
                Arguments = arguments,
                UseShellExecute = false,
                CreateNoWindow = true,
                RedirectStandardOutput = true,
                RedirectStandardError = true
            };

            return processStartInfo;
        }

        public void Start()
        {
            var processStartInfo = GetProcessStartInfo();
            _processAdapter.OutputBytesReceived += OutputBytesReceivedHandler;
            //_processAdapter.ExecuteProcessAsync(processStartInfo, 4000);

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
