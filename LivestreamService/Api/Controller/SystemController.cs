using NLog;
using Server.Streaming;
using System.Web.Http;

namespace Api.Controller
{
    public class SystemController : ApiController
    {
        private readonly StreamingServer _streamingServer = StreamingServer.GetInstance();
        private readonly ILogger _logger;

        public SystemController()
        {
            _logger = LogManager.GetCurrentClassLogger();
        }

        public string Post(int action)
        {
            _streamingServer.ShutdownServer();

            return "";
        }

    }
}
