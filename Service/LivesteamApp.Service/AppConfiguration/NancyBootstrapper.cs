using LivestreamApp.Server.AppConfiguration;
using LivestreamApp.Shared.AppConfiguration;
using LivestreamApp.Shared.Authentication;
using Nancy;
using Nancy.Authentication.Stateless;
using Nancy.Bootstrapper;
using Nancy.Bootstrappers.Ninject;
using Nancy.Conventions;
using Ninject;
using Ninject.Extensions.Logging;

namespace LivestreamApp.Service.AppConfiguration
{
    public class NancyBootstrapper : NinjectNancyBootstrapper
    {
        protected override void ApplicationStartup(IKernel kernel, IPipelines pipelines)
        {
            var authenticationService = kernel.Get<IAuthenticationService>();
            var configuration = new StatelessAuthenticationConfiguration(nancyContext =>
                {
                    var hash = (string)nancyContext.Request.Query.Auth.Value;
                    return hash == null ? null : authenticationService.Validate(hash);
                });

            StatelessAuthentication.Enable(pipelines, configuration);

#if DEBUG
            pipelines.AfterRequest.AddItemToEndOfPipeline(ctx => ctx.Response
                .WithHeader("Access-Control-Allow-Origin", "*")
                .WithHeader("Access-Control-Allow-Methods", "POST,GET")
                .WithHeader("Access-Control-Allow-Headers", "Accept, Origin, Content-type"));
#endif
        }

        protected override void ConfigureConventions(NancyConventions conventions)
        {
            base.ConfigureConventions(conventions);

            conventions.StaticContentsConventions
                .Add(StaticContentConventionBuilder.AddDirectory("app", "Client"));

            conventions.StaticContentsConventions
                .Add(StaticContentConventionBuilder.AddDirectory("backend", "Backend"));
        }

        protected override void RequestStartup(IKernel kernel, IPipelines pipelines,
            NancyContext nancyContext)
        {
            var logger = kernel.Get<ILoggerFactory>().GetCurrentClassLogger();
            pipelines.BeforeRequest += context =>
            {
                logger.Debug($"{context.Request.Method} request on {context.Request.Path}.");
                return null;
            };
        }

        protected override void ConfigureApplicationContainer(IKernel kernel)
        {
            kernel.Load(new ServerModule(), new AutoMapperModule(), new SharedModule());
        }
    }
}
