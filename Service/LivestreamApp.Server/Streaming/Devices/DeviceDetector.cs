using LivestreamApp.Server.Streaming.Processes;
using LivestreamApp.Server.Streaming.ProcessSettings;
using Ninject.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace LivestreamApp.Server.Streaming.Devices
{
    public class DeviceDetector : IDeviceDetector
    {
        public List<IDevice> Devices { get; private set; }

        private readonly ILogger _logger;
        private readonly IProcessAdapter _processAdapter;
        private readonly IProcessSettingsProvider _processSettingsProvider;
        private readonly Regex _audioDevicePattern = new Regex(@"(?<="")(.*?)(?="")");

        public DeviceDetector(ILogger logger, IProcessAdapter processAdapter,
            IProcessSettingsProvider processSettingsProvider)
        {
            _logger = logger;
            _processAdapter = processAdapter;
            _processSettingsProvider = processSettingsProvider;
        }

        public void DetectAvailableDevices()
        {
            Devices = new List<IDevice>(20);
            var lines = GetProcessOutput();
            GetAudioDevices(lines);
        }

        public IDevice GetDeviceById(string id)
        {
            if (Devices == null)
                DetectAvailableDevices();

            return Devices.FirstOrDefault(d => d.Id == id) ?? new UnknownDevice(id);
        }

        private List<string> GetProcessOutput()
        {
            var listDevicesProcessSetting = _processSettingsProvider.GetListDevicesProcessSettings();
            var output = ExecuteProcess(listDevicesProcessSetting).ErrorOutput;
            return output.Split(new[] { Environment.NewLine }, StringSplitOptions.None).ToList();
        }

        private void GetAudioDevices(List<string> lines)
        {
            var audioDevices = lines.Where(LineContainsAudioDevice)
                .Select(line => _audioDevicePattern.Match(line).Value)
                .Select(GetAudioDevice)
                .ToList();

            Devices.AddRange(audioDevices);
            _logger.Info($"Audio device(s) ({audioDevices.Count}): {string.Join(", ", audioDevices)}.");
        }

        private IDevice GetAudioDevice(string id)
        {
            var streamingProcessSettings = _processSettingsProvider.GetAudioStreamingProcessSettings(id);
            return new Device(id, DeviceType.AudioDevice, streamingProcessSettings);
        }

        private ProcessResult ExecuteProcess(IProcessSettings processSettings)
        {
            var processResult = _processAdapter.ExecuteAndReadSync(processSettings);
            return processResult.ExitCode != 1
                ? throw new Exception("Could not get process output.")
                : processResult;
        }

        private bool LineContainsAudioDevice(string line)
        {
            return line.Contains("(") && line.Contains(")") && line.Contains("\"");
        }
    }
}
