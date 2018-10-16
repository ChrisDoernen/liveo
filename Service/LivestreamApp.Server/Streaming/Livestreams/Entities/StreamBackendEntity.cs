namespace LivestreamApp.Server.Streaming.Livestreams.Entities
{
    public class StreamBackendEntity
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string CountryCode { get; set; }
        public string Input { get; set; }
        public bool HasValidInputSource { get; set; }
        public bool IsInitialized { get; set; }
    }
}
