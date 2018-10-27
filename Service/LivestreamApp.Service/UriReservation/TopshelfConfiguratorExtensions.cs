/* Adapted from: https://github.com/justeat/Topshelf.Nancy */

using System;
using Topshelf;
using Topshelf.HostConfigurators;

namespace LivestreamApp.Service.UriReservation
{
    public static class TopshelfConfigurationExtensions
    {
        public static HostConfigurator WithUriReservation(this
            HostConfigurator hostconfigurator, Action<UriReservationConfiguration> uriReservationConfigurator)
        {
            var uriReservationConfiguration = new UriReservationConfiguration();

            uriReservationConfigurator(uriReservationConfiguration);

            var uriReservationManager = new UriReservationManager();

            hostconfigurator.BeforeInstall(x => uriReservationManager.BeforeInstall());

            hostconfigurator.BeforeUninstall(uriReservationManager.BeforeUninstall);

            return hostconfigurator;
        }
    }
}