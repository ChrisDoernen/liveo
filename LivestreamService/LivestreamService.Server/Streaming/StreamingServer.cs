using LivestreamService.Server.Configuration;
using Ninject.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Management;

namespace LivestreamService.Server.Streaming
{
    public class StreamingServer
    {
        private static StreamingServer _instance;
        private readonly LivestreamsConfiguration _livestreamsConfiguration;
        private readonly AudioInputConfiguration _audioInputConfiguration;
        private WebsocketConfiguration _websocketConfiguration;
        private readonly ILogger _logger;
        private Livestreams _livestreams;
        private List<AudioInput> _audioInputs;

        public StreamingServer(ILogger logger)
        {
            _livestreamsConfiguration = new LivestreamsConfiguration();
            _audioInputConfiguration = new AudioInputConfiguration();
            _logger = logger;
        }

        public List<Livestream> GetStartedLiveStreams()
        {
            if (_livestreams == null)
                throw new ArgumentException("StreamingServerHost was not initialized.");

            return _livestreams.GetStartedStreams();
        }

        public void Initialize()
        {

            _logger.Info("StreamingServerHost initialized.");
        }



        public void Shutdown()
        {
            _livestreams.StopStreams();
        }

        public void StartStreams()
        {
            _livestreams.StartStreams();
        }

        public void StartStream(string id)
        {
            _livestreams.StartStream(id);
        }

        public void StopStream(string id)
        {
            _livestreams.StopStream(id);
        }

        public void ShutdownServer()
        {
            var mcWin32 = new ManagementClass("Win32_OperatingSystem");
            mcWin32.Get();

            // You can't shutdown without security privileges
            mcWin32.Scope.Options.EnablePrivileges = true;
            var mboShutdownParams = mcWin32.GetMethodParameters("Win32Shutdown");

            // Flag 1 means we want to shut down the system. Use "2" to reboot.
            mboShutdownParams["Flags"] = "1";
            mboShutdownParams["Reserved"] = "0";
            foreach (var managementBaseObject in mcWin32.GetInstances())
            {
                var managementObject = (ManagementObject)managementBaseObject;
                managementObject.InvokeMethod("Win32Shutdown",
                    mboShutdownParams, null);
            }
        }
    }
}
