using Ninject.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;

namespace LivestreamApp.Server.Streaming.Streams
{
    public class Streams
    {
        public List<Stream> StreamList = new List<Stream>();

        private readonly ILogger _logger;

        public Streams(ILogger logger)
        {
            _logger = logger;
        }

        public void InitializeStreams()
        {
            foreach (var livestream in StreamList)
            {
                livestream.Initialize();
            }

            _logger.Info("Livestreams initialized.");
        }

        public void StartStreams()
        {
            foreach (var livestream in StreamList)
            {
                livestream.Start();
            }
        }

        public void StopStreams()
        {
            foreach (var livestream in StreamList)
            {
                livestream.Stop();
            }
        }

        public void StartStream(string id)
        {
            StreamList.First(ls => ls.Id == id).Start();
        }

        public void StopStream(string id)
        {
            StreamList.First(ls => ls.Id == id).Stop();
        }

        public List<Stream> GetStarted()
        {
            return StreamList.Where(ls => ls.IsStarted).ToList();
        }
    }
}
