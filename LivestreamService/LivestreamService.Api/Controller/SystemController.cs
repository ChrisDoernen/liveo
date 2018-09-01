using LivestreamService.Server.Streaming;
using NLog;
using System.Web.Http;

namespace LiveStreamService.Api.Controller
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
