using System.Xml.Serialization;

namespace Service.Entities
{
    public class LiveStream
    {
        public string Id { get; set; }
        public string Description { get; set; }
        public string CountryCode { get; set; }
        public string AudioInput { get; set; }
        public int Port { get; set; }
        public bool StartOnServiceStartup { get; set; }

        [XmlIgnore]
        public bool IsStarted { get; private set; } = false;
    }
}
