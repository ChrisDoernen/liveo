using WebApi.Server;

namespace LivestreamService
{
    public class LivestreamService
    {
        private readonly IHttpServer apiServer;
        
        public LivestreamService()
        {
            apiServer = new HttpServer();
        }

        public void Start()
        {
            apiServer.Start();
        }

        public void Stop() { }
    }
}