using System;
using System.Collections.Generic;
using System.Configuration;
using System.Diagnostics;
using System.IO;

namespace Live
{
    public class Shell
    {
        private Process _processReference;
        private readonly bool _enableLogOutput;
        private readonly List<string> _environmentVariables = new List<string>
        {
            "PORT",
            "PRODUCTION",
            "SIMULATE",
            "FILESOURCE",
            "STANDALONE",
            "DATABASE",
            "FFMEGPATH"
        };

        public Shell()
        {
            var shellEnableLog = ConfigurationManager.AppSettings["SHELL_ENABLE_LOG"];

            _enableLogOutput = bool.Parse(shellEnableLog);
        }

        public void Start()
        {
            Console.WriteLine("LIVE Server started.");
            Console.WriteLine("Open your browser at \"localhost/admin\" to start.");
            Console.WriteLine("Press CTRL+C to exit or close the window.");
            StartLiveNodeApp();
        }

        public void Stop()
        {
            this._processReference.Kill();
        }

        private void StartLiveNodeApp()
        {
            SetEnvironmentVariables();
            var path = GetPath();
            var processStartInfo = new ProcessStartInfo
            {
                FileName = "node",
                Arguments = path,
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                UseShellExecute = false,
                CreateNoWindow = true
            };

            var process = new Process { StartInfo = processStartInfo };
            process.OutputDataReceived += (sender, args) => Write(args.Data);
            process.ErrorDataReceived += (sender, args) => Write(args.Data);
            process.Exited += (sender, args) => OnExit();
            _processReference = process;
            process.Start();
            process.BeginOutputReadLine();
            process.BeginErrorReadLine();
            process.WaitForExit();
        }

        private void OnExit()
        {
            Environment.Exit(0);
        }

        private string GetPath()
        {
            var path = ConfigurationManager.AppSettings["SHELL_PATH"];

            if (!File.Exists(path))
            {
                throw new FileNotFoundException();
            }

            return path;
        }

        private void SetEnvironmentVariables()
        {
            foreach (var environmentVariable in _environmentVariables)
            {
                var value = ConfigurationManager.AppSettings[environmentVariable];
                if (!string.IsNullOrEmpty(value))
                {
                    Environment.SetEnvironmentVariable(environmentVariable, value);
                }
            }
        }

        private void Write(string data)
        {
            if (_enableLogOutput)
            {
                Console.WriteLine(data);
            }
        }
    }
}
