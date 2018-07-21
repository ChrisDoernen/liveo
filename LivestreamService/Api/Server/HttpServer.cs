using System.Web.Http.Routing;
using System.Web.Http.SelfHost;

namespace Api.Server
{
    public class HttpServer : IHttpServer
    {
        public void Start()
        {
            var config = new HttpSelfHostConfiguration("http://localhost:8080");

            IHttpRoute route = new HttpRoute("api/{controller}/{action}");

            config.Routes.Add("API", route);

            var selfHostServer = new HttpSelfHostServer(config);
            selfHostServer.OpenAsync().Wait();
        }

        public void Stop()
        {
        }
    }
}