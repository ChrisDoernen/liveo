using Ninject.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text.RegularExpressions;
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
            var processResult = _processAdapter.ExecuteAndReadSync(ListDevicesProcessStartInfo);

            if (processResult.ExitCode != 1)
                throw new Exception("Could not get audio inputs.");

            // ffmpeg writes to error output
            ParseLines(processResult.ErrorOutput);

            _logger.Info($"Found {_audioInputs.Count} available audio inputs.");

            return _audioInputs;
        }

        private void ParseLines(string output)
        {
            var lines = output.Split(
                new[] { "\r\n", "\r", "\n" },
                StringSplitOptions.None
            );

            foreach (var line in lines)
            {
                if (line == null || !(line.Contains("(") && line.Contains(")") && line.Contains("\"")))
                    continue;

                // Capture everything between "" exclusively
                var regex = new Regex("(?<=\")(.*?)(?=\")");
                var audioInputIdentifier = regex.Match(line).Value;
                _audioInputs.Add(new AudioInput(audioInputIdentifier));
            }
        }
    }
}
