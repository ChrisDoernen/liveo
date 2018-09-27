using FluentAssertions;
using LivestreamApp.Server.Streaming.Entities;
using LivestreamApp.Server.Streaming.StreamingSources;
using LivestreamApp.Server.Streaming.WebSockets;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Ninject;
using Ninject.MockingKernel.Moq;
using System.Collections.Generic;

namespace LivestreamApp.Server.Test.Tests.Streaming.Entities
{
    [TestClass]
    public class LivestreamTest
    {
        private readonly MoqMockingKernel _kernel;
        private Livestream _livestream;
        private Mock<IStreamingSourceFactory> _mockStreamerFactory;
        private Mock<IStreamingSource> _mockStreamingSource;
        private Mock<IWebSocketServerAdapter> _mockWebSocketServerAdapter;

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
            _mockStreamerFactory = _kernel.GetMock<IStreamingSourceFactory>();
            _mockStreamingSource = _kernel.GetMock<IStreamingSource>();
            _mockWebSocketServerAdapter = _kernel.GetMock<IWebSocketServerAdapter>();
        }

        [TestMethod]
        public void InitializeAndStart_ValidInput_ShouldInitializeCorrectlyAndStart()
        {
            // Given
            _livestream.Id = "LivestreamId";
            _livestream.StartOnServiceStartup = true;
            var audioDevices = new List<AudioDevice> { new AudioDevice("Id") };
            _mockStreamerFactory.Setup(msf => msf.GetDevice(_livestream.Source))
                .Returns(_mockStreamingSource.Object);

            // When 
            _livestream.Initialize(audioDevices);
            _livestream.Start();

            // Then
            _livestream.HasValidAudioInput.Should().Be(true);
            _livestream.IsInitialized.Should().Be(true);
            _mockStreamerFactory.Verify(msf => msf.GetDevice(_livestream.Source), Times.Once);
            _mockStreamingSource.Verify(ms => ms.StartStreaming(), Times.Once);
            _mockWebSocketServerAdapter
                .Verify(mwssa => mwssa.AddStreamingWebSocketService("/LivestreamId", _mockStreamingSource.Object), Times.Once);
            _livestream.IsStarted.Should().Be(true);
        }

        [TestMethod]
        public void InitializeAndStart_ShouldInitializeCorrectlyAndNotStart()
        {
            // Given
            _livestream.Id = "LivestreamId";
            _livestream.Source = new AudioDevice("Id");
            _livestream.StartOnServiceStartup = true;
            var audioDevices = new List<AudioDevice> { new AudioDevice("Other Id") };
            _mockStreamerFactory.Setup(msf => msf.GetDevice(_livestream.Source))
                .Returns(_mockStreamingSource.Object);

            // When 
            _livestream.Initialize(audioDevices);
            _livestream.Start();

            // Then
            _livestream.HasValidAudioInput.Should().Be(false);
            _livestream.IsInitialized.Should().Be(true);
            _mockStreamerFactory.Verify(msf => msf.GetDevice(_livestream.Source), Times.Never);
            _mockStreamingSource.Verify(ms => ms.StartStreaming(), Times.Never);
            _mockWebSocketServerAdapter
                .Verify(mwssa => mwssa.AddStreamingWebSocketService("/LivestreamId", _mockStreamingSource.Object), Times.Never);
            _livestream.IsStarted.Should().Be(false);
        }

        [TestMethod]
        public void Stop_ShouldStopStartedStream()
        {
            // Given
            _livestream.Id = "LivestreamId";
            _livestream.Source = new AudioDevice("Id");
            _livestream.StartOnServiceStartup = true;
            var audioDevices = new List<AudioDevice> { new AudioDevice("Id") };
            _mockStreamerFactory.Setup(msf => msf.GetDevice(_livestream.Source))
                .Returns(_mockStreamingSource.Object);

            // When 
            _livestream.Initialize(audioDevices);
            _livestream.Start();
            _livestream.Stop();

            // Then
            _mockStreamingSource.Verify(ms => ms.StopStreaming(), Times.Once);
            _mockWebSocketServerAdapter
                .Verify(mwssa => mwssa.RemoveWebSocketService(It.IsAny<string>()), Times.Once);
        }
    }
}
