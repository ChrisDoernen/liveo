using FluentAssertions;
using LivestreamApp.Api.Backend.Modules;
using LivestreamApp.Server.Shutdown;
using LivestreamApp.Shared.Authentication;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Nancy;
using Nancy.Testing;
using Ninject.Extensions.Logging;
using Ninject.MockingKernel.Moq;
using System.Collections.Generic;

namespace LivestreamApp.Api.Test.Tests.Backend
{
    [TestClass]
    public class ShutdownModuleTest
    {
        private readonly MoqMockingKernel _kernel;
        private Mock<IShutdownService> _mockShutdownService;
        private Mock<ILogger> _mockLogger;

        public ShutdownModuleTest()
        {
            _kernel = new MoqMockingKernel();
        }

        [TestInitialize]
        public void TestInitialize()
        {
            _kernel.Reset();
            _mockLogger = _kernel.GetMock<ILogger>();
            _mockShutdownService = _kernel.GetMock<IShutdownService>();
        }

        [TestMethod]
        public void GetSystemShutdown_UnauthenticatedRequest_ShouldReturnUnauthorizedAndNotShutdown()
        {
            // Given
            var browser = new Browser(config =>
            {
                config.Module<ShutdownModule>();
                config.Dependency(_mockShutdownService.Object);
                config.Dependency(_mockLogger.Object);
            });

            // When
            var result = browser.Get("/api/system/shutdown", with =>
            {
                with.HttpRequest();
                with.Header("Accept", "application/json");
            });

            // Then
            result.StatusCode.Should().Be(HttpStatusCode.Unauthorized);
            _mockShutdownService.Verify(mss => mss.ShutdownServer(), Times.Never);
        }

        [TestMethod]
        public void GetSystemShutdown_AuthenticatedRequest_ShouldReturnAcceptedAndShutdown()
        {
            // Given
            var browser = new Browser(config =>
            {
                config.Module<ShutdownModule>();
                config.Dependency(_mockShutdownService.Object);
                config.Dependency(_mockLogger.Object);
                config.RequestStartup((container, pipelines, context) =>
                {
                    context.CurrentUser = new UserIdentity("Admin", new List<string> { "ACCESS-BACKEND" });
                });
            });

            // When
            var result = browser.Get("/api/system/shutdown", with =>
            {
                with.HttpRequest();
                with.Query("auth", "foo");
                with.Header("Accept", "application/json");
            });

            // Then
            result.StatusCode.Should().Be(HttpStatusCode.Accepted);
            _mockShutdownService.Verify(mss => mss.ShutdownServer(), Times.Once);
        }

        [TestMethod]
        public void GetSystemRestart_AuthenticatedRequest_ShouldReturnAcceptedAndRestart()
        {
            // Given
            var browser = new Browser(config =>
            {
                config.Module<ShutdownModule>();
                config.Dependency(_mockShutdownService.Object);
                config.Dependency(_mockLogger.Object);
                config.RequestStartup((container, pipelines, context) =>
                {
                    context.CurrentUser = new UserIdentity("Admin", new List<string> { "ACCESS-BACKEND" });
                });
            });

            // When
            var result = browser.Get("/api/system/restart", with =>
            {
                with.HttpRequest();
                with.Query("auth", "foo");
                with.Header("Accept", "application/json");
            });

            // Then
            result.StatusCode.Should().Be(HttpStatusCode.Accepted);
            _mockShutdownService.Verify(mss => mss.RestartServer(), Times.Once);
        }
    }
}
