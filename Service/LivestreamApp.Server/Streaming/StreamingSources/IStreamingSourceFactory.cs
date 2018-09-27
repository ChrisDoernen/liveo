namespace LivestreamApp.Server.Streaming.StreamingSources
{
    public interface IStreamingSourceFactory
    {
        IStreamingSource GetDevice(string deviceId, ContentType contentType);
    }
}
