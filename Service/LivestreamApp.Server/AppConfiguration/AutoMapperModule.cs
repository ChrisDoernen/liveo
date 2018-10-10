using AutoMapper;
using LivestreamApp.Server.Streaming.Livestreams;
using LivestreamApp.Server.Streaming.StreamingSessions;
using LivestreamApp.Server.Streaming.StreamingSessions.Entities;
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
            var mapperConfiguration = new MapperConfiguration(config =>
            {
                config.ConstructServicesUsing(type => context.Kernel.Get(type));
                config.AddProfiles(typeof(ServerProfile));
            });

            return mapperConfiguration.CreateMapper();
        }
    }
}
