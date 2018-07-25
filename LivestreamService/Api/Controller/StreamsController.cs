using Newtonsoft.Json;
using Server.Configuration;
using Server.Streaming;
using System.Linq;
using System.Web.Http;

namespace WebApi.Controller
{
    public class StreamsController : ApiController
    {
        private readonly IStreamingServer StreamingServer = 
            new StreamingServer(new ConfigurationManager());

        // GET api/<controller>
        public string GetStreams()
        {
            var streams = this.StreamingServer.GetStreams().ToList();
            var response = JsonConvert.SerializeObject(streams);
            return response;
        }
    }
}