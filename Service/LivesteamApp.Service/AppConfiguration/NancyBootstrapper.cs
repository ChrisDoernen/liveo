using Nancy.Bootstrapper;
using Nancy.Bootstrappers.Ninject;
using Ninject;

namespace LivestreamApp.Service.AppConfiguration
{
    public class NancyBootstrapper : NinjectNancyBootstrapper
    {
        protected override void ApplicationStartup(IKernel container, IPipelines pipelines)
        {
            // No registrations should be performed in here, however you may
            // resolve things that are needed during application startup.
            this.Conventions.ViewLocationConventions.Add((viewName, model, context) => $"Views/{viewName}");
        }

        protected override void ConfigureApplicationContainer(IKernel existingContainer)
        {
            // Perform registration that should have an application lifetime
            existingContainer.Load(
                new Server.AppConfiguration.ServerModule());
        }
    }
}
