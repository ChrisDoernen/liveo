using LivestreamService.Server.Entities;
using LivestreamService.Server.Utilities;
using Ninject.Extensions.Logging;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace LivestreamService.Server.Configuration
{
    public class AudioConfiguration
    {
        private const string ListDevicesCommand = @"ffmpeg -list_devices true -f dshow -i dummy -hide_banner";
        private readonly IExternalProcess _externalProcess;
        private readonly ILogger _logger;
        private readonly List<AudioInput> _audioInputs = new List<AudioInput>();


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

            _logger.Info($"The external process for getting audio inputs returned with code {exitCode}.");
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
