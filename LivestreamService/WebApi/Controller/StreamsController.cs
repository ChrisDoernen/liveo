using System.Collections.Generic;
using System.Web.Http;

namespace WebApi.Controller
{
    public class StreamsController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<string> GetStreams()
        {
            return new string[] { "value1", "value2" };
        }
    }
}