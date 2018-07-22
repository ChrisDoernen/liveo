using Ninject.Modules;
using Server.Configuration;
using Server.Streaming;

namespace Api.Configuration
{
    public class Dependencies : NinjectModule
    {
        public override void Load()
        {
            Bind<IStreamingServer>().To<StreamingServer>();
            Bind<IConfigurationManager>().To<ConfigurationManager>();
        }
    }
}