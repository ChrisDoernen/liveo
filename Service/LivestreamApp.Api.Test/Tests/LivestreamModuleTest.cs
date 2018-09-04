using Microsoft.VisualStudio.TestTools.UnitTesting;
using Nancy;
using Nancy.Testing;

namespace LivestreamApp.Api.Test.Tests
{
    [TestClass]
    public class LivestreamModuleTest
    {
        [TestMethod]
        public void TestMethod1()
        {
            // Given
            var bootstrapper = new DefaultNancyBootstrapper();
            var browser = new Browser(bootstrapper);

            // When
            var result = browser.Get("/api/livestreams", with =>
            {
                with.HttpRequest();
            });

            // Then
            Assert.Equals(HttpStatusCode.OK, result.StatusCode);

        }
    }
}
