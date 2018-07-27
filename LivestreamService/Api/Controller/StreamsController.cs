using Newtonsoft.Json;
using NLog;
using Server.Streaming;
using System.Web.Http;

namespace WebApi.Controller
{
    public class StreamsController : ApiController
    {
        private readonly IStreamingServer StreamingServer = new StreamingServer();
        private readonly ILogger logger;

        public StreamsController()
        {
            logger = LogManager.GetCurrentClassLogger();
        }

        // GET api/<controller>
        public string GetStreams()
        {
            var response = JsonConvert.SerializeObject("");
            logger.Info("GetStreams was invoked.");
            return response;
        }
    }
}