/* Adapted from: https://github.com/justeat/Topshelf.Nancy */

using System;
using System.Collections.Generic;

namespace LivestreamApp.Service.UriReservation
{
    public class UriReservationConfiguration
    {
        internal List<Uri> Uris { get; set; }

        internal bool ShouldCreateUrlReservationsOnInstall { get; set; }
        internal bool ShouldDeleteReservationsOnUnInstall { get; set; }
        public bool ShouldOpenFirewallPorts { get; set; }
        public string FirewallRuleName { get; set; }

        /// <summary>
        /// Determines if URL Resverations should be created automatically when the services installs.  
        /// Else Nancy will try and create the URL Reservation when it starts.  
        /// Adding URL Reservations require Adminstrative priviliages, so this is useful
        /// for when the service runs with a more restrictive use (i.e. as the Network Service).
        /// </summary>
        public void CreateUrlReservationsOnInstall()
        {
            ShouldCreateUrlReservationsOnInstall = true;
            ShouldDeleteReservationsOnUnInstall = true;
        }

        /// <summary>
        /// Opens the firewall ports on install. The ports are opened only when the CreateUrlReservationsOnInstall is called as well.
        /// </summary>
        /// <param name="firewallRuleName">The name of the firewall rule</param>
        public void OpenFirewallPortsOnInstall(string firewallRuleName)
        {
            ShouldOpenFirewallPorts = true;
            FirewallRuleName = firewallRuleName;
        }

        /// <summary>
        /// Allows Topshelf.Nancy to delete any URL Reservations it has created. 
        /// This is automatically set to true if CreateUrlReservationsOnInstall() has been previously called
        /// </summary>
        public void DeleteReservationsOnUnInstall()
        {
            ShouldDeleteReservationsOnUnInstall = true;
        }

        public UriReservationConfiguration()
        {
            Uris = new List<Uri>();
        }

        /// <summary>
        /// Adds a new Host for reservations.
        /// </summary>
        /// <param name="scheme">http or https. Defaults to http.</param>
        /// <param name="domain">The domain to listen on e.g. www.mydomain.com. Defaults to localhost.</param>
        /// <param name="port">The port to listen on. Defaults to 8080.</param>
        /// <param name="path">The path component. Defaults to an empty string.</param>
        public void AddHost(string scheme = "http", string domain = "localhost", int port = 8080, string path = "")
        {
            Uris.Add(new UriBuilder(scheme, domain, port, path).Uri);
        }
    }
}
