using Ninject.Extensions.Logging;
using System;
using System.Net;
using System.Net.Sockets;

namespace LivestreamApp.Shared.Network
{
    public class NetworkUtilities : INetworkUtilities
    {
        private readonly ILogger _logger;

        public NetworkUtilities(ILogger logger)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        /// <inheritdoc />
        public IPAddress GetIpAddress()
        {
            var hostName = Dns.GetHostEntry(Dns.GetHostName());
            foreach (var ipAddress in hostName.AddressList)
            {
                if (ipAddress.AddressFamily == AddressFamily.InterNetwork)
                {
                    var ip = ipAddress;
                    _logger.Debug($"Local ip address is {ip}.");
                    return ip;
                }
            }

            throw new Exception("No network adapters with an IPv4 address in the system!");
        }

        /// <inheritdoc />
        public IPHostEntry GetHostName()
        {
            var hostEntry = Dns.GetHostEntry(Dns.GetHostName());
            _logger.Debug($"Host name is {hostEntry.HostName}.");
            return hostEntry;
        }
    }
}
