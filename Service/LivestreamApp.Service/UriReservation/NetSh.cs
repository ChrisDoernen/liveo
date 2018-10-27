/* Adapted from: https://github.com/justeat/Topshelf.Nancy */

using System;

namespace LivestreamApp.Service.UriReservation
{
    public static class NetSh
    {
        private const string NetshCommand = "netsh";

        public static NetShResult DeleteUrlAcl(string url)
        {
            var arguments = GetDeleteParameters(url);

            try
            {
                if (UacHelper.RunElevated(NetshCommand, arguments, out string output))
                {
                    return new NetShResult(NetShResultCode.Success, output, arguments);
                }

                return FailedBecauseUrlReservationDidNotExist(output)
                    ? new NetShResult(NetShResultCode.UrlReservationDoesNotExist, output, arguments)
                    : new NetShResult(NetShResultCode.Error, output, arguments);
            }
            catch (Exception ex)
            {
                return new NetShResult(NetShResultCode.Error, ex.Message, arguments);
            }
        }

        public static NetShResult AddUrlAcl(string url, string user)
        {
            var arguments = GetAddParameters(url, user);

            try
            {
                if (UacHelper.RunElevated(NetshCommand, arguments, out var output))
                {
                    return new NetShResult(NetShResultCode.Success, output, arguments);
                }

                return FailedBecauseUrlReservationAlreadyExists(output)
                    ? new NetShResult(NetShResultCode.UrlReservationAlreadyExists, output, arguments)
                    : new NetShResult(NetShResultCode.Error, output, arguments);
            }
            catch (Exception ex)
            {
                return new NetShResult(NetShResultCode.Error, ex.Message, arguments);
            };
        }

        public static NetShResult OpenFirewallPorts(string portList, string username, string firewallRuleName)
        {
            var arguments = GetFirewallParameters(portList, firewallRuleName);

            try
            {
                return UacHelper.RunElevated(NetshCommand, arguments, out var output)
                    ? new NetShResult(NetShResultCode.Success, output, arguments)
                    : new NetShResult(NetShResultCode.Error, output, arguments);
            }
            catch (Exception ex)
            {
                return new NetShResult(NetShResultCode.Error, ex.Message, arguments);
            };
        }

        private static string GetFirewallParameters(string portList, string firewallRuleName)
        {
            return
                $"advfirewall firewall add rule name=\"{firewallRuleName}\" dir=in protocol=TCP localport=\"{portList}\" action=allow";
        }

        public static string GetDeleteParameters(string url)
        {
            return $"http delete urlacl url={url}";
        }

        public static string GetAddParameters(string url, string user)
        {
            return $"http add urlacl url={url} user={user}";
        }

        private static bool FailedBecauseUrlReservationDidNotExist(string netshProcessOutput)
        {
            return netshProcessOutput.Contains("Error: 2");
        }

        private static bool FailedBecauseUrlReservationAlreadyExists(string netshProcessOutput)
        {
            return netshProcessOutput.Contains("Error: 183");
        }
    }
}
