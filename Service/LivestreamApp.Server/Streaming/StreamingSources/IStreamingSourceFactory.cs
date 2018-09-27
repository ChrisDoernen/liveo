namespace LivestreamApp.Server.Streaming.StreamingSources
{
    public interface IStreamingSourceFactory
    {
        IStreamingSource GetStreamingSourceByDeviceId(string id);
    }
}
