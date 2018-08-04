using System.Collections.Generic;
using System.Xml.Serialization;

namespace Server
{
    [XmlRoot(Namespace = "LiveStreamsConfigXsd", ElementName = "LiveStreams")]
    public class LiveStreams
    {
        [XmlElement("LiveStream")]
        public List<LiveStream> liveStreams = new List<LiveStream>();
    }
}
