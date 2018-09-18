using LivestreamApp.Server.Streaming.Processes;
using Ninject.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace LivestreamApp.Server.Streaming.Environment
{
    public class AudioDeviceDetector : IAudioDeviceDetector
    {
        private readonly IProcessAdapter _processAdapter;
        private readonly ILogger _logger;
        private readonly Regex _matchAudioDeviceIdRegex = new Regex("(?<=\")(.*?)(?=\")");
        private const string FileName = "ffmpeg.exe";
        private const string Arguments = "-list_devices true -f dshow -i dummy -hide_banner";

        public AudioDeviceDetector(ILogger logger, IProcessAdapter processAdapter)
        {
            _logger = logger;
            _processAdapter = processAdapter;
        }

        public List<AudioDevice> GetAudioDevices()
        {
            var processResult = _processAdapter.ExecuteAndReadSync(FileName, Arguments);

            if (processResult.ExitCode != 1)
                throw new Exception("Could not get audio inputs.");

            var audioDevices = ParseLines(processResult.ErrorOutput);

            _logger.Info($"Detected {audioDevices.Count} audio devices.");
            return audioDevices;
        }

        private List<AudioDevice> ParseLines(string output)
        {
            var lines = output.Split(new[] { "\r\n" }, StringSplitOptions.None);

            return lines
                .Where(LineContainsAudioDevice)
                .Select(line =>
                {
                    var id = _matchAudioDeviceIdRegex.Match(line).Value;
                    return new AudioDevice(id);
                })
                .ToList();
        }

        private bool LineContainsAudioDevice(string line)
        {
            return line.Contains("(") && line.Contains(")") && line.Contains("\"");
        }
    }
}
