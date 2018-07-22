using Api.Server;

namespace Service.Startup
{
    public class LivestreamService
    {
        private readonly IHttpServer ApiServer = new HttpServer();

        public void Start()
        {
            ApiServer.Start();
        }

        public void Stop() { }
    }
}