namespace LivestreamService.Server.Entities
{
    public class Livestream
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string CountryCode { get; set; }
        public string AudioInput { get; set; }
        public bool StartOnServiceStartup { get; set; }
        public bool IsStarted { get; set; }
        public bool HasValidAudioInput { get; set; }
        public bool IsInitialized { get; set; }
    }
}
