using LivestreamApp.Server.Streaming.Environment;
using LivestreamApp.Server.Streaming.Processes;
using Ninject.Extensions.Logging;
using System;
using System.Threading;

namespace LivestreamApp.Server.Streaming.Streamer
{

    public class Mp3Streamer : IStreamer
    {
        private readonly ILogger _logger;
        private readonly IProcessAdapter _processAdapter;
        public AudioDevice AudioDevice { get; }
        private const string FileName = "ffmpeg.exe";
        public event EventHandler<BytesReceivedEventArgs> BytesReceived;

        public Mp3Streamer(ILogger logger, IProcessAdapter processAdapter, AudioDevice audioDevice)
        {
            _logger = logger;
            AudioDevice = audioDevice;
            _processAdapter = processAdapter;
            _logger.Info($"Initialized Mp3Streamer on audio device {AudioDevice.Id}.");
        }

        private string GetArguments()
        {
            return
                "-y -f dshow " +
                $"-i audio=\"{AudioDevice.Id}\" " +
                "-rtbufsize 64 " +
                "-probesize 64 " +
                "-acodec libmp3lame " +
                "-ab 320k " +
                "-ar 44100 " +
                "-ac 1 " +
                "-reservoir 0 " +
                "-f mp3 " +
                "-hide_banner " +
                "-fflags " +
                "+nobuffer " +
                "pipe:1";
        }

        public void Start()
        {
            var arguments = GetArguments();
            _processAdapter.OutputBytesReceived += OutputBytesReceivedHandler;
            _processAdapter.ExecuteAndReadAsync(FileName, arguments, 4000);

            _logger.Info($"Started capturing audio on input {AudioDevice.Id}.");
        }

        public void Stop()
        {
            _processAdapter.OutputBytesReceived -= OutputBytesReceivedHandler;
            _processAdapter.KillProcess();

            _logger.Info($"Stopped capturing audio on input {AudioDevice.Id}.");
        }

        private void OutputBytesReceivedHandler(object sender, BytesReceivedEventArgs e)
        {
            Interlocked.CompareExchange(ref BytesReceived, null, null)?.Invoke(this, e);
        }
    }
}
