using AutoMapper;
using LivestreamApp.Server.Streaming.Sessions;
using LivestreamApp.Server.Streaming.Sessions.Entities;
using LivestreamApp.Server.Streaming.Streams;
using Ninject;
using Ninject.Activation;
using Ninject.Modules;
using System.Collections.Generic;

namespace LivestreamApp.Server.AppConfiguration
{
    public class AutoMapperModule : NinjectModule
    {
        public override void Load()
        {
            Bind<IMapper>().ToMethod(AutoMapper).InSingletonScope();
            Bind<IValueResolver<SessionType, Session, List<Stream>>>().To<SessionValueResolver>();
        }

        private IMapper AutoMapper(IContext context)
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