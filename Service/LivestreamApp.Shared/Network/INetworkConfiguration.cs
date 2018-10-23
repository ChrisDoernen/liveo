using System.Net;

namespace LivestreamApp.Shared.Network
{
    /// <summary>
    ///     Provides network configurations
    /// </summary>
    public interface INetworkConfiguration
    {
        /// <summary>
        ///     Host name of the machine
        /// </summary>
        IPHostEntry HostEntry { get; }

        /// <summary>
        ///     Ip address of the machine
        /// </summary>
        IPAddress IpAddress { get; }

        /// <summary>
        ///     Uri for the web server to listen on
        /// </summary>
        string WebServerUri { get; }

        /// <summary>
        ///     Port to use for web socket server
        /// </summary>
        int WebSocketServerPort { get; }

        /// <summary>
        ///     Uri for the web socket server to listen on
        /// </summary>
        string WebSocketServerUri { get; }
    }
}
