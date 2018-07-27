namespace Service.Entities
{
    public class LiveStream
    {
        public readonly string Id;
        public readonly string Description;
        public readonly string CountryCode;
        public readonly string AudioInput;

        public LiveStream(string id, string description, string countryCode, string audioInput)
        {
            this.Id = id;
            this.Description = description;
            this.CountryCode = countryCode;
            this.AudioInput = audioInput;
        }
    }
}