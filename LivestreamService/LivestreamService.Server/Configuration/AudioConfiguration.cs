using LivestreamService.Server.Entities;
using LivestreamService.Server.Utilities;
using Ninject.Extensions.Logging;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text.RegularExpressions;

namespace LivestreamService.Server.Configuration
{
    public class AudioConfiguration
    {
        private const string ListDevicesCommand = @"ffmpeg -list_devices true -f dshow -i dummy -hide_banner";
        private readonly List<string> _listDevicesCommandProcessOutput = new List<string>();
        private readonly IExternalProcess _externalProcess;
        private readonly ILogger _logger;

        public AudioConfiguration(ILogger logger, IExternalProcess externalProcess)
        {
            _logger = logger;
            _externalProcess = externalProcess;
        }

        public List<AudioInput> GetAudioInputs()
        {
            // ffmpeg redirects output to error output
            _externalProcess.ErrorDataReceived += OutputDataRecievedHandler;
            var exitCode = _externalProcess.ExecuteCommandAndWaitForExit(ListDevicesCommand);
            _externalProcess.ErrorDataReceived -= OutputDataRecievedHandler;

            if (exitCode == 0)
            {
                var audioInputs = ParseProcessOutput();
                _logger.Info($"Found {audioInputs.Count} available audio inputs.");
                return audioInputs;
            }

            _logger.Warn($"The external process for getting audio inputs returned with code {exitCode}.");
            return null;
        }

        private List<AudioInput> ParseProcessOutput()
        {
            var audioInputs = new List<AudioInput>();

            foreach (var line in _listDevicesCommandProcessOutput.ToList())
            {
                if (line == null || !(line.Contains("(") && line.Contains(")") && line.Contains("\"")))
                    continue;

                // Capture everything between "" exclusively
                var regex = new Regex("(?<=\")(.*?)(?=\")");
                var audioInputIdentifier = regex.Match(line).Value;
                audioInputs.Add(new AudioInput(audioInputIdentifier));
            }

            return audioInputs;
        }

        private void OutputDataRecievedHandler(object sender, DataReceivedEventArgs e)
        {
            _listDevicesCommandProcessOutput.Add(e.Data);
        }
    }
}
