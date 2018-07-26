using NLog;
using System.Web.Http.Routing;
using System.Web.Http.SelfHost;

namespace Api.Server
{
    public class HttpServer : IHttpServer
    {
        private ILogger logger;

        public HttpServer()
        {
            logger = LogManager.GetCurrentClassLogger();
        }

        public void Start()
        {
            var config = new HttpSelfHostConfiguration("http://localhost:8080");

            IHttpRoute route = new HttpRoute("api/{controller}/{action}");

            config.Routes.Add("API", route);

            var selfHostServer = new HttpSelfHostServer(config);
            selfHostServer.OpenAsync().Wait();

            logger.Info("ApiWebServer started.");
        }

        public void Stop()
        {
            logger.Info("ApiWebServer stopped.");
        }
    }
}