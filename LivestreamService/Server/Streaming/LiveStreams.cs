using System.Collections.Generic;
using System.Linq;
using System.Xml.Serialization;

namespace Server.Streaming
{
    [XmlRoot(Namespace = "LiveStreamsConfigXsd", ElementName = "LiveStreams")]
    public class LiveStreams
    {
        [XmlElement("LiveStream")]
        public List<LiveStream> Streams = new List<LiveStream>();

        public List<LiveStream> GetStartedStreams()
        {
            return Streams.Where(ls => ls.IsStarted).ToList();
        }

        public List<LiveStream> GetAvailableStreams()
        {
            return Streams;
        }

        public void Validate(List<AudioInput> validAudioInputs)
        {
            foreach (var stream in Streams)
            {
                stream.Validate(validAudioInputs);
            }
        }

        public void Initialize()
        {
            foreach (var stream in Streams)
            {
                stream.Initialize();
            }
        }

        public void StartStreams()
        {
            foreach (var stream in Streams.Where(ls => ls.StartOnServiceStartup))
            {
                stream.Start();
            }
        }

        public void SetIPAdress(string ipAdress)
        {
            foreach (var stream in Streams)
            {
                stream.Ip = ipAdress;
            }
        }
    }
}
