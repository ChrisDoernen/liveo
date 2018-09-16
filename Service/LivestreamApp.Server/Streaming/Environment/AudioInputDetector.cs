using LivestreamApp.Server.Streaming.Processes;
using Ninject.Extensions.Logging;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text.RegularExpressions;

namespace LivestreamApp.Server.Streaming.Environment
{
    public class AudioInputDetector : IAudioInputDetector
    {
        private readonly IProcessExecutor _processExecutor;
        private readonly ILogger _logger;
        private readonly List<AudioInput> _audioInputs = new List<AudioInput>();
        private ProcessStartInfo ListDevicesProcessStartInfo => new ProcessStartInfo
        {
            FileName = "ffmpeg.exe",
            Arguments = "-list_devices true -f dshow -i dummy -hide_banner",
            RedirectStandardOutput = true,
            RedirectStandardError = true
        };

        public AudioInputDetector(ILogger logger, IProcessExecutor processExecutor)
        {
            _logger = logger;
            _processExecutor = processExecutor;
        }

        public List<AudioInput> GetAudioInputs()
        {
            // ffmpeg redirects output to error output
            _processExecutor.ErrorDataReceived += OutputDataRecievedHandler;
            var exitCode = _processExecutor.ExecuteProcess(ListDevicesProcessStartInfo);

            _logger.Info($"Found {_audioInputs.Count} available audio inputs.");

            return _audioInputs;
        }

        private void OutputDataRecievedHandler(object sender, CustomDataReceivedEventArgs e)
        {
            var line = e.Data;

            if (line == null || !(line.Contains("(") && line.Contains(")") && line.Contains("\"")))
                return;

            // Capture everything between "" exclusively
            var regex = new Regex("(?<=\")(.*?)(?=\")");
            var audioInputIdentifier = regex.Match(line).Value;
            _audioInputs.Add(new AudioInput(audioInputIdentifier));
        }
    }
}
