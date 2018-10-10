using AutoMapper;
using System;

namespace LivestreamApp.Server.Shared.Utilities
{
    public class ConfigAdapter : IConfigAdapter
    {
        private readonly IMapper _mapper;

        public ConfigAdapter(IMapper mappper)
        {
            _mapper = mappper ?? throw new ArgumentNullException(nameof(mappper));
        }

        /// <inheritdoc />
        public T Load<T, TConfig>(string config, string scheme)
        {
            var type = XmlSerializer.ValidateAndDeserialize<TConfig>(config, scheme);
            return _mapper.Map<T>(type);
        }

        /// <inheritdoc />
        public void Save<T, TConfig>(T objectToSave, string config)
        {
            var streamsType = _mapper.Map<TConfig>(objectToSave);
            XmlSerializer.Serialize(streamsType, config);
        }
    }
}
