using NLog;
using System.Diagnostics;

namespace Server.Streaming
{
    internal class StreamingServer
    {
        private readonly string audioInput;
        private readonly int port;
        private readonly ILogger logger;
        private readonly string command;
        private Process process;
        private bool isProcessRunning;

        public StreamingServer(string audioInput, int port)
        {
            this.logger = LogManager.GetCurrentClassLogger();
            this.audioInput = audioInput;
            this.port = port;
            this.command = $@"ffmpeg -y -f dshow -i audio=""{audioInput}"" -rtbufsize 64 -probesize 64 -acodec libmp3lame -ab 320k -ac 1 -reservoir 0 -f mp3 -fflags +nobuffer - | node NodeStreamingServer.js -port {port} -type mp3 -burstsize 0.1";
        }
        
        public void Start()
        {
            var processInfo = new ProcessStartInfo("cmd.exe", "/c " + this.command)
            {
                CreateNoWindow = false,
                UseShellExecute = false,
                RedirectStandardError = true,
                RedirectStandardOutput = true
            };

            var process = Process.Start(processInfo);

            // ffmpeg sends all output to error output
            process.ErrorDataReceived += this.DataRecievedHandler;
            process.BeginErrorReadLine();
            
            this.process = process;
            this.isProcessRunning = true;
        }

        public void Stop()
        {
            this.process.Kill();
            this.process.Close();
            this.isProcessRunning = false;
        }

        private void DataRecievedHandler (object sender, DataReceivedEventArgs e)
        {
        }

        public bool IsAlive()
        {
            return this.isProcessRunning && this.process.Responding;
        }
    }
}
