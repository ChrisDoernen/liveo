using System.Net;

namespace LivestreamApp.Shared.Network
{
    /// <summary>
    ///     Exposes network related helper methods
    /// </summary>
    public interface INetworkUtilities
    {
        /// <summary>
        ///     Get the ip address of the machine
        /// </summary>
        /// <returns>The ip address</returns>
        IPAddress GetIpAddress();

        /// <summary>
        ///     Get the host name of the machine
        /// </summary>
        /// <returns>The host name</returns>
        IPHostEntry GetHostName();
    }
}
