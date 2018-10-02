using LivestreamApp.Server.AppConfiguration;
using LivestreamApp.Shared.AppConfiguration;
using LivestreamApp.Shared.Security;
using Nancy.Authentication.Stateless;
using Nancy.Bootstrapper;
using Nancy.Bootstrappers.Ninject;
using Ninject;

namespace LivestreamApp.Service.AppConfiguration
{
    public class NancyBootstrapper : NinjectNancyBootstrapper
    {
        protected override void ApplicationStartup(IKernel kernel, IPipelines pipelines)
        {
            // No registrations should be performed in here, however you may
            // resolve things that are needed during application startup.
            Conventions.ViewLocationConventions.Add((viewName, model, context) => $"Views/{viewName}");

            var authenticationService = kernel.Get<IAuthenticationProvider>();
            var configuration =
                new StatelessAuthenticationConfiguration(nancyContext =>
                {
                    var hash = (string)nancyContext.Request.Query.Auth.Value;
                    return authenticationService.Validate(hash);
                });

            StatelessAuthentication.Enable(pipelines, configuration);
        }

        protected override void ConfigureApplicationContainer(IKernel kernel)
        {
            // Perform registration that should have an application lifetime
            kernel.Load(new ServerModule(), new AutoMapperModule(), new SharedModule());
        }
    }
}
