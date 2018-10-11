using LivestreamApp.Server.AppConfiguration;
using LivestreamApp.Shared.AppConfiguration;
using LivestreamApp.Shared.Authentication;
using Nancy;
using Nancy.Authentication.Stateless;
using Nancy.Bootstrapper;
using Nancy.Bootstrappers.Ninject;
using Ninject;
using Ninject.Extensions.Logging;

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

        protected override void RequestStartup(IKernel kernel, IPipelines pipelines,
            NancyContext nancyContext)
        {
            var logger = kernel.Get<ILoggerFactory>().GetCurrentClassLogger();
            pipelines.BeforeRequest += (c) =>
            {
                var userName = c.CurrentUser != null ? c.CurrentUser.UserName : "no user";
                logger.Debug($"{c.Request.Method} request on {c.Request.Path} - {userName}.");
                return null;
            };
        }

        protected override void ConfigureApplicationContainer(IKernel kernel)
        {
            // Perform registration that should have an application lifetime
            kernel.Load(new ServerModule(), new AutoMapperModule(), new SharedModule());
        }
    }
}
