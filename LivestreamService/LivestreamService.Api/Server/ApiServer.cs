using NLog;
using System;
using System.Configuration;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Routing;
using System.Web.Http.SelfHost;

namespace LiveStreamService.Api.Server
{
    public class ApiServer : IApiServer
    {
        private readonly ILogger _logger;

        public ApiServer()
        {
            _logger = LogManager.GetCurrentClassLogger();
        }

        public void Start()
        {
            TryStartApiServer();

            _logger.Info("ApiWebServer started.");
        }

        private void TryStartApiServer()
        {
            try
            {
                StartApiServer();
            }
            catch (Exception ex)
            {
                _logger.Info("Starting ApiServer failed.");
                _logger.Error(ex.Message + ex.StackTrace);
                throw ex;
            }
        }

        private void StartApiServer()
        {
            var port = ConfigurationManager.AppSettings["ApiServerPort"];
            var appServerIp = ConfigurationManager.AppSettings["AppServerIp"];

            if (port == null)
                throw new ArgumentException("Port is not defined in app.config");

            var defaults = new HttpRouteValueDictionary(new { id = RouteParameter.Optional });
            var route = new HttpRoute("api/{controller}/{id}", defaults);
            var config = new HttpSelfHostConfiguration($"http://localhost:{port}");
            var origin = $"http://{appServerIp}";
            var cors = new EnableCorsAttribute(origin, "*", "GET");
            config.EnableCors(cors);
            config.Routes.Add("API", route);

            var selfHostServer = new HttpSelfHostServer(config);
            selfHostServer.OpenAsync().Wait();
        }

        public void Stop()
        {
            _logger.Info("ApiWebServer stopped.");
        }
    }
}