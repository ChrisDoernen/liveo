using NLog;
using System.Diagnostics;

namespace Server.Streaming
{
    internal class StreamingServerProcess
    {
        private readonly string _audioInput;
        private readonly int _port;
        private readonly ILogger _logger;
        private readonly string _command;
        private Process _process;
        private bool _isProcessRunning;

        public StreamingServerProcess(string audioInput, int port)
        {
            _logger = LogManager.GetCurrentClassLogger();
            this._audioInput = audioInput;
            this._port = port;
            _command = $@"ffmpeg -y -f dshow -i audio=""{audioInput}"" -rtbufsize 64 -probesize 64 -acodec libmp3lame -ab 320k -ac 1 -reservoir 0 -f mp3 -hide_banner -fflags +nobuffer - | node NodeStreamingServer.js -port {port} -type mp3 -burstsize 0.1";
        }
        
        public void Start()
        {
            var processInfo = new ProcessStartInfo("cmd.exe", "/c " + _command)
            {
                CreateNoWindow = false,
                UseShellExecute = false,
                RedirectStandardError = true,
                RedirectStandardOutput = true
            };

            var process = Process.Start(processInfo);

            // ffmpeg sends all output to error output
            process.ErrorDataReceived += DataRecievedHandler;
            process.BeginErrorReadLine();

            _process = process;
            _isProcessRunning = true;
        }

        public void Stop()
        {
            _process.Kill();
            _process.Close();
            _isProcessRunning = false;
        }

        private void DataRecievedHandler (object sender, DataReceivedEventArgs e)
        {
        }

        public bool IsRunning()
        {
            return _isProcessRunning && _process.Responding;
        }
    }
}
