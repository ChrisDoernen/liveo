using Server.Streaming;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text.RegularExpressions;

namespace Server.Configuration
{
    public class AudioInputConfiguration
    {
        private readonly string _listDevicesCommand = $@"ffmpeg -list_devices true -f dshow -i dummy -hide_banner";

        private readonly List<string> _listDevicesCommandProcessOutput = new List<string>();

        public List<AudioInput> GetAudioInputs()
        {
            // This is a horrible way of getting the audio inputs but
            // there seems to be no other way...
            StartListDevicesCommandProcess();
            var audioInputs = ParseProcessOutput();
            return audioInputs;
        }

        private void StartListDevicesCommandProcess()
        {
            var processInfo = new ProcessStartInfo("cmd.exe", "/c " + _listDevicesCommand)
            {
                CreateNoWindow = false,
                UseShellExecute = false,
                RedirectStandardError = true,
                RedirectStandardOutput = true
            };

            var process = Process.Start(processInfo);

            // ffmpeg sends all output to error output for some reason
            process.ErrorDataReceived += DataRecievedHandler;
            process.BeginErrorReadLine();

            process.WaitForExit();
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

        private void DataRecievedHandler(object sender, DataReceivedEventArgs e)
        {
            _listDevicesCommandProcessOutput.Add(e.Data);
        }
    }
}
