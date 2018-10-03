using FluentAssertions;
using LivestreamApp.Server.Shared.WebSockets;
using LivestreamApp.Server.Streaming.StreamingSources;
using LivestreamApp.Server.Streaming.Streams.Entities;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Ninject;
using Ninject.MockingKernel.Moq;

namespace LivestreamApp.Server.Test.Tests.Streaming.Entities
{
    [TestClass]
    public class LivestreamTest
    {
        private readonly MoqMockingKernel _kernel;
        private Livestream _livestream;
        private Mock<IWebSocketServerAdapter> _mockWebSocketServerAdapter;
        private Mock<IStreamingSourceFactory> _mockStreamerFactory;
        private Mock<IStreamingSource> _mockStreamingSource;

        public LivestreamTest()
        {
            _kernel = new MoqMockingKernel();
            _kernel.Bind<Livestream>().ToSelf();
        }

        [TestInitialize]
        public void TestInitialize()
        {
            _kernel.Reset();
            _livestream = _kernel.Get<Livestream>();
            _mockWebSocketServerAdapter = _kernel.GetMock<IWebSocketServerAdapter>();
            _mockStreamerFactory = _kernel.GetMock<IStreamingSourceFactory>();
            _mockStreamingSource = _kernel.GetMock<IStreamingSource>();
        }

        [TestMethod]
        public void InititalizeAndStart_StartOnStartupValidSource_ShouldInitializeCorrectlyAndStart()
        {
            // Given
            _livestream.Id = "deutsch";
            _livestream.StartOnServiceStartup = true;
            _mockStreamerFactory
                .Setup(msf => msf.GetStreamingSourceByDeviceId(_livestream.Input))
                .Returns(_mockStreamingSource.Object);
            _mockStreamingSource
                .Setup(mss => mss.HasValidDevice())
                .Returns(true);

            // When 
            _livestream.Initialize();
            _livestream.Start();

            // Then
            _livestream.HasValidInputSource.Should().Be(true);
            _livestream.IsInitialized.Should().Be(true);
            _mockStreamingSource.Verify(ms => ms.StartStreaming(), Times.Once);
            _mockWebSocketServerAdapter
                .Verify(mwssa => mwssa.AddStreamingWebSocketService("/livestreams/deutsch",
                    _mockStreamingSource.Object));
            _mockWebSocketServerAdapter
                .Verify(mwssa => mwssa.AddLoggingWebSocketService("/livestreams/log/deutsch",
                    _mockStreamingSource.Object));

        }

        [TestMethod]
        public void InititalizeAndStart_StartOnStartupInValidSource_ShouldInitializeCorrectlyAndNotStart()
        {
            // Given
            _livestream.StartOnServiceStartup = true;
            _mockStreamerFactory
                .Setup(msf => msf.GetStreamingSourceByDeviceId(_livestream.Input))
                .Returns(_mockStreamingSource.Object);
            _mockStreamingSource
                .Setup(mss => mss.HasValidDevice())
                .Returns(false);

            // When 
            _livestream.Initialize();
            _livestream.Start();

            // Then
            _livestream.HasValidInputSource.Should().Be(false);
            _livestream.IsInitialized.Should().Be(true);
            _mockStreamingSource.Verify(ms => ms.StartStreaming(), Times.Never);
        }

        [TestMethod]
        public void Stop_ShouldStopStartedStream()
        {
            // Given
            _livestream.Id = "Id";
            _livestream.StartOnServiceStartup = true;
            _mockStreamerFactory
                .Setup(msf => msf.GetStreamingSourceByDeviceId(_livestream.Input))
                .Returns(_mockStreamingSource.Object);
            _mockStreamingSource
                .Setup(mss => mss.HasValidDevice())
                .Returns(true);

            // When 
            _livestream.Initialize();
            _livestream.Start();
            _livestream.Stop();

            // Then
            _mockStreamingSource.Verify(ms => ms.StopStreaming(), Times.Once);
            _mockWebSocketServerAdapter
                .Verify(mwssa => mwssa.RemoveWebSocketService("/livestreams/Id"), Times.Once);
            _mockWebSocketServerAdapter
                .Verify(mwssa => mwssa.RemoveWebSocketService("/livestreams/log/Id"), Times.Once);
        }
    }
}
