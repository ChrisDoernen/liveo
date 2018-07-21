namespace Server.Streaming
{
    public class LiveStream
    {
        private readonly string Id;
        private readonly string Description;
        private readonly string CountryCode;
        private readonly string AudioInput;

        public LiveStream(string id, string description, string countryCode, string audioInput)
        {
            this.Id = id;
            this.Description = description;
            this.CountryCode = countryCode;
            this.AudioInput = audioInput;
        }
    }
}