using FluentAssertions;
using LivestreamApp.Server.AppConfiguration;
using LivestreamApp.Server.Streaming.Livestreams.Manager;
using LivestreamApp.Shared.AppSettings;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Ninject;
using Ninject.MockingKernel.Moq;

namespace LivestreamApp.Server.Test.Tests.Streaming.Livestreams.Manager
{
    [TestClass]
    public class StreamManagerTest
    {
        private readonly MoqMockingKernel _kernel;
        private Mock<IAppSettingsProvider> _mockAppSettingsProvider;

        public StreamManagerTest()
        {
            _kernel = new MoqMockingKernel();
            _kernel.Load(new AutoMapperModule());
            _kernel.Bind<IStreamManager>().To<StreamManager>();
        }

        [TestInitialize]
        public void TestInitialize()
        {
            _kernel.Reset();
            _mockAppSettingsProvider = _kernel.GetMock<IAppSettingsProvider>();
        }

        [TestMethod]
        public void GetStreams_ShouldReturnCorrectStreams()
        {
            // Given
            _mockAppSettingsProvider
                .Setup(masp => masp.GetStringValue(AppSetting.StreamsConfigurationFile))
                .Returns("TestResources\\Config\\ValidStreams.config");

            // When
            var streamManager = _kernel.Get<IStreamManager>();
            var streams = streamManager.GetStreams();

            // Then
            streams.Should().NotBeNull();
            streams[0].Id.Should().Be("deutsch");
        }
    }
}
