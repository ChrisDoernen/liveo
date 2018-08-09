using Server.Streaming;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Serialization;

namespace Server
{
    [XmlRoot(Namespace = "LiveStreamsConfigXsd", ElementName = "LiveStreams")]
    public class LiveStreams
    {
        [XmlElement("LiveStream")]
        public List<LiveStream> liveStreams = new List<LiveStream>();

        public List<LiveStream> GetStartedStreams()
        {
            return liveStreams.Where(ls => ls.IsStarted).ToList();
        }

        public List<LiveStream> GetAvailableStreams()
        {
            return liveStreams;
        }

        public void Validate(List<AudioInput> validAudioInputs)
        {
            foreach (var stream in liveStreams)
            {
                stream.Validate(validAudioInputs);
            }
        }

        public void Initialize()
        {
            foreach (var stream in liveStreams)
            {
                stream.Initialize();
            }
        }

        public void StartStreams()
        {
            foreach (var stream in liveStreams.Where(ls => ls.StartOnServiceStartup))
            {
                stream.Start();
            }
        }
    }
}
