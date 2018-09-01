using AutoMapper;

namespace LivestreamService.Service.AppConfiguration
{
    public class AutoMapper
    {
        public static void Initialize()
        {
            Mapper.Initialize(config => config.AddProfiles(new[] {
                        typeof(Server.AppConfiguration.AutoMapperProfile)
                    })
                );

            Mapper.AssertConfigurationIsValid();
        }
    }
}
