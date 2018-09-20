using LivestreamApp.Server.Streaming.Environment;
using LivestreamApp.Server.Streaming.Processes;
using Ninject.Extensions.Logging;
using System;
using WebSocketSharp;
using WebSocketSharp.Server;

namespace LivestreamApp.Server.Streaming.Core
{
    public class Mp3Streamer : WebSocketBehavior, IDisposable
    {
        private readonly ILogger _logger;
        private readonly IProcessAdapter _processAdapter;
        private readonly AudioDevice _audioDevice;
        private const string FileName = "ffmpeg.exe";

        public Mp3Streamer(ILogger logger, IProcessAdapter processAdapter, AudioDevice audioDevice)
        {
            _logger = logger;
            _audioDevice = audioDevice;
            _processAdapter = processAdapter;
            IgnoreExtensions = true;
        }

        private string GetArguments()
        {
            return
                "-y -f dshow " +
                $"-i audio=\"{_audioDevice.Id}\" " +
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

            _logger.Info($"Started capturing audio on input {_audioDevice.Id}.");
        }

        public void Stop()
        {
            _processAdapter.OutputBytesReceived -= OutputBytesReceivedHandler;
            _processAdapter.KillProcess();

            _logger.Info($"Stopped capturing audio on input {_audioDevice.Id}.");
        }

        private void OutputBytesReceivedHandler(object sender, BytesReceivedEventArgs e)
        {
            Sessions?.Broadcast(e.Bytes);
        }

        protected override void OnOpen()
        {
            _logger.Info("New client connected.");
            base.OnOpen();
        }

        protected override void OnClose(CloseEventArgs e)
        {
            _logger.Info("Client disconnected.");
            base.OnClose(e);
        }

        public void Dispose()
        {
            Stop();
        }
    }
}
