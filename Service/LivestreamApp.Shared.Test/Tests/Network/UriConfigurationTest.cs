using FluentAssertions;
using LivestreamApp.Shared.AppSettings;
using LivestreamApp.Shared.Network;
using Moq;
using Ninject;
using Ninject.MockingKernel.Moq;
using NUnit.Framework;
using System.Net;

namespace LivestreamApp.Shared.Test.Tests.Network
{
    [TestFixture]
    public class UriConfigurationTest
    {
        private readonly MoqMockingKernel _kernel;
        private Mock<IAppSettingsProvider> _mockAppSettingsProvider;
        private Mock<INetworkUtilities> _mockNetworkUtilities;
        private INetworkConfiguration _networkConfiguration;

        public UriConfigurationTest()
        {
            _kernel = new MoqMockingKernel();
            _kernel.Bind<INetworkConfiguration>().To<NetworkConfiguration>();
        }

        [SetUp]
        public void TestInitialize()
        {
            _kernel.Reset();
            _mockAppSettingsProvider = _kernel.GetMock<IAppSettingsProvider>();
            _mockNetworkUtilities = _kernel.GetMock<INetworkUtilities>();
            ConfigureMocks();
            _networkConfiguration = _kernel.Get<INetworkConfiguration>();
        }

        private void ConfigureMocks()
        {
            var expectedIpAddress = IPAddress.Parse("192.168.1.1");
            _mockNetworkUtilities.Setup(mnu => mnu.GetIpAddress()).Returns(expectedIpAddress);

            var hostEntry = new IPHostEntry { HostName = "live" };
            _mockNetworkUtilities.Setup(mnu => mnu.GetHostName()).Returns(hostEntry);

            _mockAppSettingsProvider
                .Setup(masp => masp.GetIntValue(AppSetting.DefaultPort))
                .Returns(80);
            _mockAppSettingsProvider
                .Setup(masp => masp.GetIntValue(AppSetting.DefaultWebSocketPort))
                .Returns(8080);
        }

        [Test]
        public void IpAddress_ShouldReturnCorrectIp()
        {
            // Given when 
            var ipAddress = _networkConfiguration.IpAddress;

            // Then
            ipAddress.Should().BeEquivalentTo(IPAddress.Parse("192.168.1.1"));
        }

        [Test]
        public void HostName_ShouldReturnCorrectHostName()
        {
            // Given when 
            var host = _networkConfiguration.HostEntry;

            // Then
            host.HostName.Should().BeEquivalentTo("live");
        }

        [Test]
        public void WebServerUri_ShouldReturnCorrectUri()
        {
            // Given when 
            var webServerUri = _networkConfiguration.WebServerUri;

            // Then
            webServerUri.Should().Be("http://192.168.1.1:80/");
        }

        [Test]
        public void WebSocketServerPort_ShouldReturnCorrectPort()
        {
            // Given when 
            var webSocketServerPort = _networkConfiguration.WebSocketServerPort;

            // Then
            webSocketServerPort.Should().Be(8080);
        }

        [Test]
        public void WebSocketServerUri_ShouldReturnCorrectUri()
        {
            // Given when 
            var webSocketServerUri = _networkConfiguration.WebSocketServerUri;

            // Then
            webSocketServerUri.Should().Be("ws://192.168.1.1:8080/");
        }
    }
}
