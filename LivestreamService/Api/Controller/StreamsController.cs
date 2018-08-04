using Newtonsoft.Json;
using NLog;
using Server.Streaming;
using System.Web.Http;

namespace WebApi.Controller
{
    public class StreamsController : ApiController
    {
        private readonly StreamingServerHost streamingServer = StreamingServerHost.GetInstance();
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