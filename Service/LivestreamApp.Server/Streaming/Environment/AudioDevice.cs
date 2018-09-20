namespace LivestreamApp.Server.Streaming.Environment
{
    public class AudioDevice
    {
        public readonly string Id;

        public AudioDevice(string id)
        {
            Id = id;
        }

        public override bool Equals(object obj)
        {
            var audioDevice = (AudioDevice)obj;

            return audioDevice != null
                && audioDevice.Id == Id;
        }

        public override int GetHashCode()
        {
            return Id.GetHashCode();
        }
    }
}
