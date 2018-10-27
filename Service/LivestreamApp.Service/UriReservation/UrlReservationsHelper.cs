/* Adapted from: https://github.com/justeat/Topshelf.Nancy */

using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using Topshelf.Logging;

namespace LivestreamApp.Service.UriReservation
{
    internal class UrlReservationsHelper
    {
        private readonly List<Uri> _uris;
        private static readonly LogWriter Logger = HostLogger.Get(typeof(UrlReservationsHelper));

        public UrlReservationsHelper(List<Uri> uris)
        {
            _uris = uris;
        }

        public bool TryDeleteUrlReservations()
        {
            Logger.Info("Deleting URL Reservations");

            foreach (var prefix in GetPrefixes())
            {
                var result = NetSh.DeleteUrlAcl(prefix);

                switch (result.ResultCode)
                {
                    case NetShResultCode.Error:
                        {
                            var message =
                                $"Error deleting URL Reservation {prefix} with command: netsh {result.CommandRan}. {result.Message}";
                            Logger.Error(message);
                            return false;
                        }
                    case NetShResultCode.UrlReservationDoesNotExist:
                        {
                            var message =
                                $"Could not delete URL Reservation {prefix} because it does not exist. Treating as a success.";
                            Logger.Warn(message);
                            break;
                        }
                    case NetShResultCode.Success:
                    case NetShResultCode.UrlReservationAlreadyExists:
                        break;
                    default:
                        throw new ArgumentOutOfRangeException();
                }
            }

            Logger.Info("URL Reservations deleted");

            return true;
        }

        public bool OpenFirewallPorts(IEnumerable<int> ports, string firewallRuleName)
        {
            Logger.Info("Opening firewall ports");

            var user = GetUser();

            var portList = string.Join(",", ports);

            var result = NetSh.OpenFirewallPorts(portList, user, firewallRuleName);
            if (result.ResultCode == NetShResultCode.Error)
            {
                var message =
                    $"Error opening firewall ports {portList}: netsh {result.CommandRan}. {result.Message}";
                Logger.Error(message);
                return false;
            }

            Logger.Info($"Firewall ports opened: {portList}");
            return true;
        }

        public bool AddUrlReservations(bool shouldOpenFirewallPorts = false)
        {
            var prefixes = GetPrefixes().ToList();
            LogUrlReservations(prefixes);

            var user = GetUser();

            foreach (var prefix in prefixes)
            {
                var result = NetSh.AddUrlAcl(prefix, user);
                switch (result.ResultCode)
                {
                    case NetShResultCode.Error:
                        {
                            var message =
                                $"Error adding URL Reservation {prefix} with command: netsh {result.CommandRan}. {result.Message}";
                            Logger.Error(message);
                            return false;
                        }
                    case NetShResultCode.UrlReservationAlreadyExists:
                        {
                            var message =
                                $"Could not add URL Reservation {prefix} because it already exists. Treating as a success.";
                            Logger.Warn(message);
                            return true;
                        }
                    case NetShResultCode.Success:
                    case NetShResultCode.UrlReservationDoesNotExist:
                        break;
                    default:
                        throw new ArgumentOutOfRangeException();
                }
            }

            Logger.Info("URL Reservations added");

            return true;
        }

        private static void LogUrlReservations(IList<string> prefixes)
        {
            switch (prefixes.Count)
            {
                case 0:
                    Logger.Warn("No URL reservations found.");
                    break;
                case 1:
                    Logger.Info("Adding Reservation for one URL: " + prefixes[0]);
                    break;
                default:
                    Logger.Info($"Adding Reservations for {prefixes.Count} URLs.");
                    break;
            }
        }

        private string GetUser()
        {
            return WindowsIdentity.GetCurrent().Name;
        }

        private IEnumerable<string> GetPrefixes()
        {
            foreach (var baseUri in _uris)
            {
                var prefix = baseUri.ToString();

                if (baseUri.IsDefaultPort)
                {
                    prefix = prefix.Replace(baseUri.Host, $"{baseUri.Host}:{baseUri.Port}");
                }

                // ToDo: Decide about original line
                // if (_nancyHostConfiguration.RewriteLocalhost && !baseUri.Host.Contains("."))
                if (false && !baseUri.Host.Contains("."))
                {
                    prefix = prefix.Replace("localhost", "+");
                }

                yield return prefix;
            }
        }
    }
}
