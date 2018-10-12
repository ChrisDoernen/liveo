using FluentAssertions;
using LivestreamApp.Server.AppConfiguration;
using LivestreamApp.Server.Shared.Utilities;
using LivestreamApp.Server.Streaming.Livestreams;
using LivestreamApp.Server.Streaming.Livestreams.Entities;
using LivestreamApp.Server.Streaming.Livestreams.Service;
using LivestreamApp.Shared.Utilities;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Ninject;
using Ninject.MockingKernel.Moq;

namespace LivestreamApp.Server.Test.Tests.Streaming.Livestreams.Service
{
    [TestClass]
    public class StreamServiceTest
    {
        private readonly MoqMockingKernel _kernel;
        private Mock<IConfigAdapter> _mockConfigDataAdapter;
        private Mock<IHashGenerator> _mockHashGenerator;
        private IStreamService _streamService;

        public StreamServiceTest()
        {
            _kernel = new MoqMockingKernel();
            _kernel.Load(new AutoMapperModule());
            _kernel.Bind<Stream>().To<Stream>();
            _kernel.Bind<IStreamService>().To<StreamService>();
        }

        [TestInitialize]
        public void TestInitialize()
        {
            _mockConfigDataAdapter = _kernel.GetMock<IConfigAdapter>();
            _mockHashGenerator = _kernel.GetMock<IHashGenerator>();
            _streamService = GetStreamManager();
        }

        private IStreamService GetStreamManager()
        {
            var streams = ConstructStreams();

            _mockConfigDataAdapter
                .Setup(mcda => mcda.Load<Streams, StreamsType>(It.IsAny<string>(), It.IsAny<string>()))
                .Returns(streams);

            return _kernel.Get<IStreamService>();
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
            var returnedStreams = _streamService.GetStreams();

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
            _streamService.CreateStream(newStream);
            var returnedStreams = _streamService.GetStreams();

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
            _streamService.DeleteStream("8b5aa");
            var returnedStreams = _streamService.GetStreams();

            // Then
            returnedStreams.Should().NotBeNull();
            returnedStreams.Count.Should().Be(1);
            returnedStreams[0].Id.Should().Be("bce9e");
            _mockConfigDataAdapter
                .Verify(mcda => mcda.Save<Streams, StreamsType>(It.IsAny<Streams>(),
                    It.IsAny<string>()), Times.Once);
        }

        [TestMethod]
        public void DeleteStream_IdIsNotContained_ShouldDoNothing()
        {
            // Given when
            _streamService.DeleteStream("8b5va");
            var returnedStreams = _streamService.GetStreams();

            // Then
            returnedStreams.Should().NotBeNull();
            returnedStreams.Count.Should().Be(2);
            returnedStreams[0].Id.Should().Be("8b5aa");
            returnedStreams[1].Id.Should().Be("bce9e");
        }

        [TestMethod]
        public void UpdateStream_IdIsContained_ShouldUpdateStreamCorrectlyAndCallUpdateConfig()
        {
            // Given
            var streamWithUpdate = _kernel.Get<StreamBackendEntity>();
            streamWithUpdate.Title = "SomeNewTitle";
            streamWithUpdate.Id = "8b5aa";

            // When
            _streamService.UpdateStream(streamWithUpdate);
            var returnedStreams = _streamService.GetStreams();

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

        [TestMethod]
        public void UpdateStream_IdIsNotContained_ShouldDoNothing()
        {
            // Given
            var streamWithUpdate = _kernel.Get<StreamBackendEntity>();
            streamWithUpdate.Title = "SomeNewTitle";
            streamWithUpdate.Id = "8b5av";

            // When
            _streamService.UpdateStream(streamWithUpdate);
            var returnedStreams = _streamService.GetStreams();

            // Then
            returnedStreams.Should().NotBeNull();
            returnedStreams.Count.Should().Be(2);
            returnedStreams[0].Id.Should().Be("8b5aa");
            returnedStreams[1].Id.Should().Be("bce9e");
            returnedStreams[1].Title.Should().Be(null);
        }
    }
}
