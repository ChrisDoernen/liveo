using Newtonsoft.Json;
using NLog;
using Server.Streaming;
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

        // GET api/<controller>
        public string GetStartedStreams()
        {
            var liveStreams = _streamingServer.GetStartedLiveStreams();
            var response = JsonConvert.SerializeObject(liveStreams);

            _logger.Info($"GetStartedStreams was invoked, returned {liveStreams.Count} streams.");

            return response;
        }
    }
}