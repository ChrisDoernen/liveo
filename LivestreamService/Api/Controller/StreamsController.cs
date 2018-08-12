using Newtonsoft.Json;
using NLog;
using Server.Streaming;
using System.Linq;
using System.Web.Http;

namespace Api.Controller
{
    public class StreamsController : ApiController
    {
        private readonly StreamingServer _streamingServer = StreamingServer.GetInstance();
        private readonly ILogger _logger;

        public StreamsController()
        {
            _logger = LogManager.GetCurrentClassLogger();
        }
        
        public string Get()
        {
            var liveStreams = _streamingServer.GetStartedLiveStreams();
            var response = JsonConvert.SerializeObject(liveStreams);

            _logger.Info($"Get streams was invoked, returned {liveStreams.Count} stream(s).");

            return response;
        }

        public string Get(string id)
        {
            var liveStream = _streamingServer.GetStartedLiveStreams()
                .Where(ls => ls.Id == id);
            
            var response = JsonConvert.SerializeObject(liveStream);
            _logger.Info($"Get stream was invoked, returned stream {id}.");
            return response;
        }
    }
}