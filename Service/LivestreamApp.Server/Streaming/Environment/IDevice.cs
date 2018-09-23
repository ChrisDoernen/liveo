namespace LivestreamApp.Server.Streaming.Environment
{
    /// <summary>
    ///     Represents either an audio or video device
    /// </summary>
    public class Device
    {
        public string Id { get; }

        public Device(string id)
        {
            Id = id;
        }

        public override bool Equals(object obj)
        {
            var audioDevice = (Device)obj;

            return audioDevice != null
                   && audioDevice.Id == Id;
        }

        public override int GetHashCode()
        {
            return Id.GetHashCode();
        }
    }
}
