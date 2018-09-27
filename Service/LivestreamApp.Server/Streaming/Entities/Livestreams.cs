using Ninject.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;

namespace LivestreamApp.Server.Streaming.Entities
{
    public class Livestreams
    {
        public List<Livestream> Streams = new List<Livestream>();

        private readonly ILogger _logger;

        public Livestreams(ILogger logger)
        {
            _logger = logger;
        }

        public void InitializeStreams()
        {
            foreach (var livestream in Streams)
            {
                livestream.Initialize();
            }

            _logger.Info("Livestreams initialized.");
        }

        public void StartStreams()
        {
            foreach (var livestream in Streams)
            {
                livestream.Start();
            }
        }

        public void StopStreams()
        {
            foreach (var livestream in Streams)
            {
                livestream.Stop();
            }
        }

        public void StartStream(string id)
        {
            Streams.First(ls => ls.Id == id).Start();
        }

        public void StopStream(string id)
        {
            Streams.First(ls => ls.Id == id).Stop();
        }

        public List<Livestream> GetStarted()
        {
            return Streams.Where(ls => ls.IsStarted).ToList();
        }
    }
}
