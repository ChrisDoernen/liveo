using FluentAssertions;
using LivestreamApp.Backend.Modules;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Nancy;
using Nancy.Testing;
using Ninject.Extensions.Logging;

namespace LivestreamApp.Backend.Test.Tests
{
    [TestClass]
    public class BackendModuleTest
    {
        [TestMethod]
        public void Get_ShouldReturnCorrectView()
        {
            // Given
            var mockLogger = new Mock<ILogger>();

            var browser = new Browser(config =>
            {
                config.Module<BackendModule>();
                config.Dependency(mockLogger.Object);
            });

            // When
            var result = browser.Get("/backend", with =>
            {
                with.HttpRequest();
            });

            // Then
            result.StatusCode.Should().Be(HttpStatusCode.OK);
        }
    }
}
