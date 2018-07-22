using Newtonsoft.Json;
using Ninject;
using Server.Streaming;
using System.Linq;
using System.Reflection;
using System.Web.Http;

namespace WebApi.Controller
{
    public class StreamsController : ApiController
    {
        private readonly IStreamingServer StreamingServer;

        public StreamsController()
        {
            var kernel = new StandardKernel();
            kernel.Load(Assembly.GetExecutingAssembly());
            this.StreamingServer = kernel.Get<IStreamingServer>();
        }

        // GET api/<controller>
        public string GetStreams()
        {
            var streams = this.StreamingServer.GetStreams().ToList();
            var response = JsonConvert.SerializeObject(streams);
            return response;
        }
    }
}