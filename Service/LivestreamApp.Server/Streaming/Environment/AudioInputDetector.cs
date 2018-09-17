using Ninject.Extensions.Logging;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text.RegularExpressions;
using CustomDataReceivedEventArgs = LivestreamApp.Server.Streaming.Processes.CustomDataReceivedEventArgs;
using IProcessAdapter = LivestreamApp.Server.Streaming.Processes.IProcessAdapter;

namespace LivestreamApp.Server.Streaming.Environment
{
    public class AudioInputDetector : IAudioInputDetector
    {
        private readonly IProcessAdapter _processAdapter;
        private readonly ILogger _logger;
        private readonly List<AudioInput> _audioInputs = new List<AudioInput>();
        private ProcessStartInfo ListDevicesProcessStartInfo => new ProcessStartInfo
        {
            FileName = "ffmpeg.exe",
            Arguments = "-list_devices true -f dshow -i dummy -hide_banner",
            UseShellExecute = false,
            CreateNoWindow = true,
            RedirectStandardOutput = true,
            RedirectStandardError = true
        };

        public AudioInputDetector(ILogger logger, IProcessAdapter processAdapter)
        {
            _logger = logger;
            _processAdapter = processAdapter;
        }

        public List<AudioInput> GetAudioInputs()
        {
            // ffmpeg redirects output to error output
            var output = string.Empty;
            var errorOutput = string.Empty;
            var exitCode = _processAdapter.ExecuteAndReadSync(ListDevicesProcessStartInfo,
                out output, out errorOutput);

            var lines = errorOutput.Split();

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
