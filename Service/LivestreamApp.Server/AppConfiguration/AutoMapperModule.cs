using AutoMapper;
using Ninject;
using Ninject.Modules;

namespace LivestreamApp.Server.AppConfiguration
{
    public class AutoMapperModule : NinjectModule
    {
        public override void Load()
        {
            Bind<IMapper>().ToMethod(AutoMapper).InSingletonScope();
        }

        private IMapper AutoMapper(Ninject.Activation.IContext context)
        {
            Mapper.Initialize(config =>
            {
                config.ConstructServicesUsing(type => context.Kernel.Get(type));
                config.AddProfiles(typeof(ServerProfile));
            });

            Mapper.AssertConfigurationIsValid();
            return Mapper.Instance;
        }
    }
}