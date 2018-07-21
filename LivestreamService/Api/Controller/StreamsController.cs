using Server.Streaming;
using System.Collections.Generic;
using System.Web.Http;

namespace WebApi.Controller
{
    public class StreamsController : ApiController
    {
        private readonly IStreamingServer StreamingServer;

        public StreamsController()
        {
            this.StreamingServer = new StreamingServer();
        }

        // GET api/<controller>
        public IEnumerable<string> GetStreams()
        {
            var streams = this.StreamingServer.GetStreams();

            return new string[] { "value1", "value2" };
        }
    }
}