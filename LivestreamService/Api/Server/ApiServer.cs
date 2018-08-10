using NLog;
using System;
using System.Configuration;
using System.Web.Http;
using System.Web.Http.Routing;
using System.Web.Http.SelfHost;

namespace Api.Server
{
    public class ApiServer : IApiServer
    {
        private ILogger logger;
        
        public ApiServer()
        {
            logger = LogManager.GetCurrentClassLogger();
        }

        public void Start()
        {
            TryStartApiServer();

            logger.Info("ApiWebServer started.");
        }

        private void TryStartApiServer()
        {
            try
            {
                StartApiServer();
            }
            catch (Exception ex)
            {
                logger.Info("Starting ApiServer failed.");
                logger.Error(ex.Message + ex.StackTrace);
                throw ex;
            }
        }

        private void StartApiServer()
        {
            var port = ConfigurationManager.AppSettings["ApiServerPort"];

            if (port == null)
                throw new ArgumentException("Port is not defined in app.config");
            
            var route = new HttpRoute("api/{controller}/{action}");
            var config = new HttpSelfHostConfiguration($"http://localhost:{port}");
            config.EnableCors();
            config.Routes.Add("API", route);

            var selfHostServer = new HttpSelfHostServer(config);
            selfHostServer.OpenAsync().Wait();
        }

        public void Stop()
        {
            logger.Info("ApiWebServer stopped.");
        }
    }
}