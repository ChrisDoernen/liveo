﻿using Nancy.Bootstrappers.Ninject;
using Ninject;

namespace LivestreamService.Service.AppConfiguration
{
    public class NancyBootstrapper : NinjectNancyBootstrapper
    {
        protected override void ConfigureApplicationContainer(IKernel existingContainer)
        {
            // Perform registration that should have an application lifetime
            existingContainer.Load(
                new Server.AppConfiguration.ServerModule());
        }
    }
}
