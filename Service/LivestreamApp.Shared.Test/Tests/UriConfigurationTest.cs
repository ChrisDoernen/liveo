using FluentAssertions;
using LivestreamApp.Shared.AppSettings;
using LivestreamApp.Shared.Network;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

namespace LivestreamApp.Shared.Test.Tests
{
    [TestClass]
    public class UriConfigurationTest
    {
        private UriConfiguration _uriConfiguration;
        private readonly Mock<IAppSettingsProvider> _appSettingsProvider = new Mock<IAppSettingsProvider>();

        [TestInitialize]
        public void TestInitialize()
        {
            _uriConfiguration = new UriConfiguration(_appSettingsProvider.Object);
        }

        [TestMethod]
        public void GetWsUri_ShouldReturnCorrectUri()
        {
            // Given
            _appSettingsProvider
                .Setup(masp => masp.GetIntValue(It.IsAny<AppSetting>()))
                .Returns(1234);

            // When 
            var wsUri = _uriConfiguration.GetWsUri();

            // Then
            wsUri.Should().Be("ws://localhost:1234/");
        }

        [TestMethod]
        public void GetHttpUri_ShouldReturnCorrectUri()
        {
            // Given
            _appSettingsProvider
                .Setup(masp => masp.GetIntValue(It.IsAny<AppSetting>()))
                .Returns(4321);

            // When 
            var wsUri = _uriConfiguration.GetHttpUri();

            // Then
            wsUri.Should().Be("http://localhost:4321/");
        }

    }
}
