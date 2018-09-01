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
        private readonly string _listDevicesCommand = @"ffmpeg -list_devices true -f dshow -i dummy -hide_banner";
        private readonly List<string> _listDevicesCommandProcessOutput = new List<string>();
        private readonly ExternalProcess _externalProcess;
        private readonly ILogger _logger;

        public AudioConfiguration(ILogger logger, ExternalProcess externalProcess)
        {
            _logger = logger;
            _externalProcess = externalProcess;
        }

        public List<AudioInput> GetAudioInputs()
        {
            // ffmpeg redirects output to error output
            _externalProcess.ErrDataReceived += OutputDataRecievedHandler;
            _externalProcess.ExecuteCommandAndWaitForExit(_listDevicesCommand);
            _externalProcess.ErrDataReceived -= OutputDataRecievedHandler;

            var audioInputs = ParseProcessOutput();
            return audioInputs;
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
