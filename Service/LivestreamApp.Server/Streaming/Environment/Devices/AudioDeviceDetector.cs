using LivestreamApp.Server.Streaming.Processes;
using Ninject.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace LivestreamApp.Server.Streaming.Environment.Devices
{
    public class AudioDeviceDetector : IAudioDeviceDetector
    {
        private readonly IProcessAdapter _processAdapter;
        private readonly ILogger _logger;
        private readonly Regex _matchAudioDeviceIdRegex = new Regex("(?<=\")(.*?)(?=\")");
        private readonly IDeviceManager _deviceManager;
        private const string FileName = "ffmpeg.exe";
        private const string Arguments = "-list_devices true -f dshow -i dummy -hide_banner";

        public AudioDeviceDetector(ILogger logger, IProcessAdapter processAdapter,
            IDeviceManager deviceManager)
        {
            _logger = logger;
            _processAdapter = processAdapter;
            _deviceManager = deviceManager;
        }

        public List<AudioDevice> GetAudioDevices()
        {
            var audioDevices = new List<AudioDevice>();

            var processSettings = new ProcessSettings(FileName, Arguments);
            var processResult = _processAdapter.ExecuteAndReadSync(processSettings);

            if (processResult.ExitCode != 1)
                throw new Exception("Could not get audio inputs.");

            var audioDeviceIds = ParseLines(processResult.ErrorOutput);

            foreach (var id in audioDeviceIds)
            {
                audioDevices.Add(_deviceManager.GetAudioDevice(id));
            }

            _logger.Info($"Detected {audioDevices.Count} audio devices.");
            return audioDevices;
        }

        private List<string> ParseLines(string output)
        {
            var lines = output.Split(new[] { "\r\n" }, StringSplitOptions.None);

            return lines
                .Where(LineContainsAudioDevice)
                .Select(line => _matchAudioDeviceIdRegex.Match(line).Value)
                .ToList();
        }

        private bool LineContainsAudioDevice(string line)
        {
            return line.Contains("(") && line.Contains(")") && line.Contains("\"");
        }
    }
}
