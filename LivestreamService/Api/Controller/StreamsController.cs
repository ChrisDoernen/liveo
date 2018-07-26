using Newtonsoft.Json;
using NLog;
using Server.Configuration;
using Server.Streaming;
using System.Linq;
using System.Web.Http;

namespace WebApi.Controller
{
    public class StreamsController : ApiController
    {
        private readonly IStreamingServer StreamingServer = new StreamingServer(new ConfigurationManager());
        private readonly ILogger logger;

        public StreamsController()
        {
            logger = LogManager.GetCurrentClassLogger();
        }

        // GET api/<controller>
        public string GetStreams()
        {
            var streams = this.StreamingServer.GetStreams().ToList();
            var response = JsonConvert.SerializeObject(streams);
            logger.Info("GetStreams was invoked.");
            return response;
        }
    }
}