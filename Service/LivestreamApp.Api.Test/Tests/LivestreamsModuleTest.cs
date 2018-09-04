using FluentAssertions;
using LivestreamApp.Service.AppConfiguration;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Nancy;
using Nancy.Testing;

namespace LivestreamApp.Api.Test.Tests
{
    [TestClass]
    public class LivestreamsModuleTest
    {
        [TestMethod]
        public void GetLivestreams_ShouldReturnStatusOk()
        {
            // Given
            var bootstrapper = new NancyBootstrapper();
            var browser = new Browser(bootstrapper);

            // When
            var result = browser.Get("/livestreams", with =>
            {
                with.HttpRequest();
            });

            // Then
            result.StatusCode.Should().Be(HttpStatusCode.OK);
        }
    }
}
