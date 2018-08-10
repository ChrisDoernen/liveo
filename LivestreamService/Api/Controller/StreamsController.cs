using Newtonsoft.Json;
using NLog;
using Server.Streaming;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Api.Controller
{
    [EnableCors("http://localhost:4200", "*", "*")]
    public class StreamsController : ApiController
    {
        private readonly StreamingServer streamingServer = StreamingServer.GetInstance();
        private readonly ILogger logger;

        public StreamsController()
        {
            logger = LogManager.GetCurrentClassLogger();
        }

        // GET api/<controller>
        public string GetStartedStreams()
        {
            var liveStreams = this.streamingServer.GetStartedLiveStreams();
            var response = JsonConvert.SerializeObject(liveStreams);

            logger.Info($"GetStartedStreams was invoked, returned {liveStreams.Count} streams.");

            return response;
        }
    }
}