using System;

namespace LivestreamApp.Server.Shared.ProcessSettings
{
    public class ProcessSettingsProvider : IProcessSettingsProvider
    {
        public string FileName { get; } = "ffmpeg.exe";
        public int BufferSize { get; } = 4500;
        private int SampleRate { get; } = 44100;
        private int Bitrate { get; } = 224;
        private int NumberOfChannels { get; } = 1;
        private int Resorvoir { get; } = 0;
        private int Probesize { get; } = 64;
        private int RtBufSize { get; } = 64;

        public IProcessSettings GetListDevicesProcessSettings()
        {
            var arguments = "-list_devices true -f dshow -i dummy -hide_banner";

            return new ProcessSettings(FileName, arguments);
        }

        public IProcessSettings GetAudioStreamingProcessSettings(string audioDeviceId)
        {
            if (string.IsNullOrEmpty(audioDeviceId))
                throw new ArgumentException(nameof(audioDeviceId));

            var arguments =
                "-y -f dshow " +
                $"-i audio=\"{audioDeviceId}\" " +
                $"-rtbufsize {RtBufSize} " +
                $"-probesize {Probesize} " +
                "-acodec libmp3lame " +
                $"-ab {Bitrate}k " +
                $"-ar {SampleRate} " +
                $"-ac {NumberOfChannels} " +
                $"-reservoir {Resorvoir} " +
                "-f mp3 " +
                "-hide_banner " +
                "-fflags " +
                "+nobuffer " +
                "pipe:1";

            return new ProcessSettings(FileName, arguments, BufferSize);
        }
    }
}
