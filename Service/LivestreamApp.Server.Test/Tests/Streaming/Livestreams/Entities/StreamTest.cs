using FluentAssertions;
using LivestreamApp.Server.Shared.WebSockets;
using LivestreamApp.Server.Streaming.Livestreams;
using LivestreamApp.Server.Streaming.StreamingSources;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Ninject;
using Ninject.MockingKernel.Moq;

namespace LivestreamApp.Server.Test.Tests.Streaming.Livestreams.Entities
{
    [TestClass]
    public class StreamTest
    {
        private readonly MoqMockingKernel _kernel;
        private Stream _stream;
        private Mock<IWebSocketServerAdapter> _mockWebSocketServerAdapter;
        private Mock<IStreamingSourceFactory> _mockStreamerFactory;
        private Mock<IStreamingSource> _mockStreamingSource;

        public StreamTest()
        {
            _kernel = new MoqMockingKernel();
            _kernel.Bind<Stream>().ToSelf();
        }

        [TestInitialize]
        public void TestInitialize()
        {
            _kernel.Reset();
            _stream = _kernel.Get<Stream>();
            _mockWebSocketServerAdapter = _kernel.GetMock<IWebSocketServerAdapter>();
            _mockStreamerFactory = _kernel.GetMock<IStreamingSourceFactory>();
            _mockStreamingSource = _kernel.GetMock<IStreamingSource>();
        }

        [TestMethod]
        public void InititalizeAndStart_StartOnStartupValidSource_ShouldInitializeCorrectlyAndStart()
        {
            // Given
            _stream.Id = "deutsch";
            _stream.StartOnServiceStartup = true;
            _mockStreamerFactory
                .Setup(msf => msf.GetStreamingSourceByDeviceId(_stream.Input))
                .Returns(_mockStreamingSource.Object);
            _mockStreamingSource
                .Setup(mss => mss.HasValidDevice())
                .Returns(true);

            // When 
            _stream.Initialize();
            _stream.Start();

            // Then
            _stream.HasValidInputSource.Should().Be(true);
            _stream.IsInitialized.Should().Be(true);
            _mockStreamingSource.Verify(ms => ms.StartStreaming(), Times.Once);
            _mockWebSocketServerAdapter
                .Verify(mwssa => mwssa.AddStreamingWebSocketService("/streams/deutsch",
                    _mockStreamingSource.Object));
            _mockWebSocketServerAdapter
                .Verify(mwssa => mwssa.AddLoggingWebSocketService("/streams/log/deutsch",
                    _mockStreamingSource.Object));

        }

        [TestMethod]
        public void InititalizeAndStart_StartOnStartupInValidSource_ShouldInitializeCorrectlyAndNotStart()
        {
            // Given
            _stream.StartOnServiceStartup = true;
            _mockStreamerFactory
                .Setup(msf => msf.GetStreamingSourceByDeviceId(_stream.Input))
                .Returns(_mockStreamingSource.Object);
            _mockStreamingSource
                .Setup(mss => mss.HasValidDevice())
                .Returns(false);

            // When 
            _stream.Initialize();
            _stream.Start();

            // Then
            _stream.HasValidInputSource.Should().Be(false);
            _stream.IsInitialized.Should().Be(true);
            _mockStreamingSource.Verify(ms => ms.StartStreaming(), Times.Never);
        }

        [TestMethod]
        public void Stop_ShouldStopStartedStream()
        {
            // Given
            _stream.Id = "Id";
            _stream.StartOnServiceStartup = true;
            _mockStreamerFactory
                .Setup(msf => msf.GetStreamingSourceByDeviceId(_stream.Input))
                .Returns(_mockStreamingSource.Object);
            _mockStreamingSource
                .Setup(mss => mss.HasValidDevice())
                .Returns(true);

            // When 
            _stream.Initialize();
            _stream.Start();
            _stream.Stop();

            // Then
            _mockStreamingSource.Verify(ms => ms.StopStreaming(), Times.Once);
            _mockWebSocketServerAdapter
                .Verify(mwssa => mwssa.RemoveWebSocketService("/streams/Id"), Times.Once);
            _mockWebSocketServerAdapter
                .Verify(mwssa => mwssa.RemoveWebSocketService("/streams/log/Id"), Times.Once);
        }
    }
}
