namespace LivestreamApp.Server.Shared.XmlSerialization
{
    public interface ITypeSerializer
    {
        TDest DeserializeAndMap<TSource, TDest>(string config, string scheme);
        void MapAndSerialize<TSource, TDest>(TSource objectToSerialize, string config);
    }
}