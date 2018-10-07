using FluentAssertions;
using LivestreamApp.Server.AppConfiguration;
using LivestreamApp.Server.Shared.Utilities;
using LivestreamApp.Server.Streaming.Livestreams;
using LivestreamApp.Server.Streaming.Livestreams.Entities;
using LivestreamApp.Server.Streaming.Livestreams.Manager;
using LivestreamApp.Shared.Utilities;
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
        private Mock<IConfigDataAdapter> _mockConfigDataAdapter;
        private Mock<IHashGenerator> _mockHashGenerator;
        private IStreamManager _streamManager;

        public StreamManagerTest()
        {
            _kernel = new MoqMockingKernel();
            _kernel.Bind<Stream>().To<Stream>();
            _kernel.Load(new AutoMapperModule());
            _kernel.Bind<IStreamManager>().To<StreamManager>();
        }

        [TestInitialize]
        public void TestInitialize()
        {
            _kernel.Reset();
            _mockConfigDataAdapter = _kernel.GetMock<IConfigDataAdapter>();
            _mockHashGenerator = _kernel.GetMock<IHashGenerator>();
            _streamManager = GetStreamManager();
        }

        private IStreamManager GetStreamManager()
        {
            var streams = ConstructStreams();

            _mockConfigDataAdapter
                .Setup(mcda => mcda.Load<Streams, StreamsType>(It.IsAny<string>(), It.IsAny<string>()))
                .Returns(streams);

            return _kernel.Get<IStreamManager>();
        }

        private Streams ConstructStreams()
        {
            var firstStream = _kernel.Get<Stream>();
            firstStream.Id = "8b5aa";
            var secondStream = _kernel.Get<Stream>();
            secondStream.Id = "bce9e";

            var streams = _kernel.Get<Streams>();
            streams.StreamList.Add(firstStream);
            streams.StreamList.Add(secondStream);

            return streams;
        }

        [TestMethod]
        public void GetStreams_ShouldReturnCorrectStreams()
        {
            // Given when
            var returnedStreams = _streamManager.GetStreams();

            // Then
            returnedStreams.Should().NotBeNull();
            returnedStreams.Count.Should().Be(2);
            returnedStreams[0].Id.Should().Be("8b5aa");
            returnedStreams[1].Id.Should().Be("bce9e");
        }

        [TestMethod]
        public void CreateStream_ShouldAddCorrectStreamAndCallUpdateConfig()
        {
            // Given
            var newStream = _kernel.Get<StreamBackendEntity>();
            newStream.Title = "SomeTitle";
            _mockHashGenerator.Setup(mhg => mhg.GetMd5Hash(It.IsAny<string>())).Returns("1bf4f");

            // When
            _streamManager.CreateStream(newStream);
            var returnedStreams = _streamManager.GetStreams();

            // Then
            returnedStreams.Should().NotBeNull();
            returnedStreams.Count.Should().Be(3);
            returnedStreams[0].Id.Should().Be("8b5aa");
            returnedStreams[1].Id.Should().Be("bce9e");
            returnedStreams[2].Id.Should().Be("1bf4f");
            returnedStreams[2].Title.Should().Be("SomeTitle");
            _mockConfigDataAdapter
                .Verify(mcda => mcda.Save<Streams, StreamsType>(It.IsAny<Streams>(),
                    It.IsAny<string>()), Times.Once);
        }

        [TestMethod]
        public void DeleteStream_IdIsContained_ShouldDeleteCorrectStreamAndCallUpdateConfig()
        {
            // Given when
            _streamManager.DeleteStream("8b5aa");
            var returnedStreams = _streamManager.GetStreams();

            // Then
            returnedStreams.Should().NotBeNull();
            returnedStreams.Count.Should().Be(1);
            returnedStreams[0].Id.Should().Be("bce9e");
            _mockConfigDataAdapter
                .Verify(mcda => mcda.Save<Streams, StreamsType>(It.IsAny<Streams>(),
                    It.IsAny<string>()), Times.Once);
        }

        [TestMethod]
        public void UpdateStream_IdIsContained_ShouldUpdateStreamCorrectlyAndCallUpdateConfig()
        {
            // Given
            var streamWithUpdate = _kernel.Get<StreamBackendEntity>();
            streamWithUpdate.Title = "SomeNewTitle";
            streamWithUpdate.Id = "8b5aa";

            // When
            _streamManager.UpdateStream(streamWithUpdate);
            var returnedStreams = _streamManager.GetStreams();

            // Then
            returnedStreams.Should().NotBeNull();
            returnedStreams.Count.Should().Be(2);
            returnedStreams[0].Id.Should().Be("bce9e");
            returnedStreams[1].Id.Should().Be("8b5aa");
            returnedStreams[1].Title.Should().Be("SomeNewTitle");
            _mockConfigDataAdapter
                .Verify(mcda => mcda.Save<Streams, StreamsType>(It.IsAny<Streams>(),
                    It.IsAny<string>()), Times.Once);
        }
    }
}
