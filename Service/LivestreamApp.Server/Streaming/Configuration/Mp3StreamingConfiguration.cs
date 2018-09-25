using Castle.Core.Internal;
using System;

namespace LivestreamApp.Server.Streaming.Configuration
{
    public class Mp3StreamingConfiguration : IStreamingConfiguration
    {
        public string FileName { get; } = "ffmpeg.exe";
        public int BufferSize { get; } = 4000;
        private int SampleRate { get; } = 44100;
        private int Bitrate { get; } = 320;
        private int NumberOfChannels { get; } = 1;
        private int Resorvoir { get; } = 0;
        private int Probesize { get; } = 64;
        private int RtBufSize { get; } = 64;

        public string GetArguments(string deviceId)
        {
            return deviceId.IsNullOrEmpty()
                ? throw new ArgumentException("Device id not set.")
                : "-y -f dshow " +
                  $"-i audio=\"{deviceId}\" " +
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
        }
    }
}
