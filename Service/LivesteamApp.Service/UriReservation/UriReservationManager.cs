/* Adapted from: https://github.com/justeat/Topshelf.Nancy */

using Nancy.Hosting.Self;
using System.Linq;

namespace LivestreamApp.Service.UriReservation
{
    internal class UriReservationManager
    {
        private UriReservationConfiguration _uriReservationConfiguration;

        private UrlReservationsHelper _urlReservationsHelper;

        public void Configure(UriReservationConfiguration uriReservationConfiguration)
        {
            var nancyHostConfiguration = new HostConfiguration();

            _uriReservationConfiguration = uriReservationConfiguration;

            _urlReservationsHelper = new UrlReservationsHelper(_uriReservationConfiguration.Uris);
        }

        public void BeforeInstall()
        {
            if (_uriReservationConfiguration.ShouldCreateUrlReservationsOnInstall)
            {
                _urlReservationsHelper.TryDeleteUrlReservations();

                if (_uriReservationConfiguration.ShouldOpenFirewallPorts)
                {
                    var ports = _uriReservationConfiguration.Uris.Select(x => x.Port).ToList();
                    _urlReservationsHelper.OpenFirewallPorts(ports,
                        _uriReservationConfiguration.FirewallRuleName);
                }

                _urlReservationsHelper.AddUrlReservations();
            }
        }

        public void BeforeUninstall()
        {
            if (_uriReservationConfiguration.ShouldDeleteReservationsOnUnInstall)
            {
                _urlReservationsHelper.TryDeleteUrlReservations();
            }
        }
    }
}
