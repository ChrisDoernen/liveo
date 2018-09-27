namespace LivestreamApp.Server.Streaming.StreamingSources
{
    public interface IStreamingSourceManager
    {
        void InitializeAvailableSources();
        IStreamingSource GetStreamingSourceByDeviceId(string id);
    }
}
