using AutoMapper;
using Ninject.Extensions.Logging;
using System;
using System.IO;

namespace LivestreamApp.Server.Shared.XmlSerialization
{
    public class TypeSerializer : ITypeSerializer
    {
        private readonly ILogger _logger;
        private readonly IMapper _mapper;

        public TypeSerializer(ILogger logger, IMapper mapper)
        {
            _logger = logger;
            _mapper = mapper;
        }

        public TDest DeserializeAndMap<TSource, TDest>(string config, string scheme)
        {
            ValidateConfigFileExistance(config);
            var deserializedType = XmlUtilities.ValidateAndDeserialize<TSource>(config, scheme);
            var mappedType = _mapper.Map<TDest>(deserializedType);
            return mappedType;
        }

        public void MapAndSerialize<TSource, TDest>(TSource source, string config)
        {
            var mappedType = _mapper.Map<TDest>(source);
            XmlUtilities.Serialize(mappedType, config);

        }

        private void ValidateConfigFileExistance(string configFile)
        {
            if (!File.Exists(configFile))
                throw new ArgumentException("The LiveStreams.xsd could not be found.");

            _logger.Info($"{configFile} exist.");
        }
    }
}
