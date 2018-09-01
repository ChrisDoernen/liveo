using NLog;
using System.Diagnostics;

namespace LivestreamService.Server.Streaming
{
    internal class StreamingServerProcess
    {
        private readonly string _command;
        private Process _process;
        private bool _isProcessRunning;

        public StreamingServerProcess(string audioInput, WebsocketConfiguration websocket)
        {
            _command = $@"ffmpeg -y -f dshow -i audio=""{audioInput}"" -rtbufsize 64 -probesize 64 -acodec libmp3lame -ab 320k -ac 1 -reservoir 0 -f {websocket.AudioEncoding} -hide_banner -fflags +nobuffer - | node Resources/NodeStreamingServer.js -port {websocket.Port} -type {websocket.AudioEncoding} -burstsize 0.1";
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

        private void DataRecievedHandler(object sender, DataReceivedEventArgs e)
        {
            var logger = LogManager.GetCurrentClassLogger();
            //logger.Warn(e.Data);
        }

        public bool IsRunning()
        {
            return _isProcessRunning && _process.Responding;
        }
    }
}
