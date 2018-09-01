using System.Collections.Generic;
using System.Linq;

namespace LivestreamService.Server.Streaming
{
    public class LiveStreams
    {
        public List<LiveStream> Livestreams = new List<LiveStream>();

        public List<LiveStream> GetStartedStreams()
        {
            return Livestreams.Where(ls => ls.IsStarted).ToList();
        }

        public List<LiveStream> GetAvailableStreams()
        {
            return Livestreams;
        }

        public void Validate(List<AudioInput> validAudioInputs)
        {
            foreach (var stream in Livestreams)
            {
                stream.Validate(validAudioInputs);
            }
        }

        public void Initialize()
        {
            foreach (var stream in Livestreams)
            {
                stream.Initialize();
            }
        }

        public void StartStreams()
        {
            foreach (var stream in Livestreams.Where(ls => ls.StartOnServiceStartup))
            {
                stream.Start();
            }
        }

        public void StartStream(string id)
        {
            Livestreams.First(s => s.Id == id).Start();
        }


        public void StopStreams()
        {
            foreach (var stream in Livestreams)
            {
                stream.Stop();
            }
        }

        public void StopStream(string id)
        {
            Livestreams.First(s => s.Id == id).Stop();
        }


        public void SetIpAdress(string ipAdress)
        {
            foreach (var stream in Livestreams)
            {
                stream.Ip = ipAdress;
            }
        }
    }
}
