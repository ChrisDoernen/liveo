using LivestreamApp.Server.Streaming.Processes;
using Ninject.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace LivestreamApp.Server.Streaming.Environment.Devices
{
    public class AudioDeviceManager : IAudioDeviceManager
    {
        private readonly IProcessAdapter _processAdapter;
        private readonly ILogger _logger;
        private readonly Regex _matchAudioDeviceIdRegex = new Regex("(?<=\")(.*?)(?=\")");
        private readonly IDeviceFactory _deviceFactory;
        private const string FileName = "ffmpeg.exe";
        private const string Arguments = "-list_devices true -f dshow -i dummy -hide_banner";

        public AudioDeviceManager(ILogger logger, IProcessAdapter processAdapter,
            IDeviceFactory deviceFactory)
        {
            _logger = logger;
            _processAdapter = processAdapter;
            _deviceFactory = deviceFactory;
        }

        public List<AudioDevice> GetAudioDevices()
        {
            var processResult = GetProcessResult();
            var audioDeviceIds = ParseLines(processResult.ErrorOutput);
            var audioDevices = audioDeviceIds.Select(id => _deviceFactory.GetAudioDevice(id)).ToList();
            _logger.Info($"Detected {audioDevices.Count} audio devices.");
            return audioDevices;
        }

        private ProcessResult GetProcessResult()
        {
            var processSettings = new ProcessSettings(FileName, Arguments);
            var processResult = _processAdapter.ExecuteAndReadSync(processSettings);

            if (processResult.ExitCode != 1)
                throw new Exception("Could not get audio inputs.");
            return processResult;
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
