using LivestreamApp.Server.Streaming.Processes;
using Ninject.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace LivestreamApp.Server.Streaming.Environment.Devices
{
    public class DeviceDetector : IDeviceDetector
    {
        private readonly ILogger _logger;
        private readonly IProcessAdapter _processAdapter;
        private readonly IProcessSettings _processSettings;
        private readonly Regex _audioDeviceId = new Regex("(?<=\")(.*?)(?=\")");

        public DeviceDetector(ILogger logger, IProcessAdapter processAdapter)
        {
            _logger = logger;
            _processAdapter = processAdapter;
            _processSettings = new ProcessSettings("ffmpeg.exe",
                "-list_devices true -f dshow -i dummy -hide_banner");
        }

        public Dictionary<string, DeviceType> GetAvailableDevices()
        {
            var availableDevices = new Dictionary<string, DeviceType>();

            var output = ExecuteProcess(_processSettings).ErrorOutput;
            var lines = output.Split(new[] { "\r\n" }, StringSplitOptions.None).ToList();
            var audioDevices = GetAudioDevicesFromLines(lines);

            foreach (var device in audioDevices)
            {
                availableDevices.Add(device, DeviceType.AudioDevice);
            }

            _logger.Info($"Detected {availableDevices.Count} audio devices.");

            return availableDevices;
        }

        private ProcessResult ExecuteProcess(IProcessSettings processSettings)
        {
            var processResult = _processAdapter.ExecuteAndReadSync(processSettings);
            return processResult.ExitCode != 1
                ? throw new Exception("Could not get audio inputs.")
                : processResult;
        }

        private List<string> GetAudioDevicesFromLines(List<string> lines)
        {
            return lines
                .Where(LineContainsAudioDevice)
                .Select(line => _audioDeviceId.Match(line).Value)
                .ToList();
        }

        private bool LineContainsAudioDevice(string line)
        {
            return line.Contains("(") && line.Contains(")") && line.Contains("\"");
        }
    }
}
