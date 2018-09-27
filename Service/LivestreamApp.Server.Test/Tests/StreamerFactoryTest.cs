using FluentAssertions;
using LivestreamApp.Server.Streaming.StreamingSources;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Ninject;
using Ninject.MockingKernel.Moq;

namespace LivestreamApp.Server.Test.Tests
{
    [TestClass]
    public class StreamerFactoryTest
    {
        private readonly MoqMockingKernel _kernel;
        private IStreamingSourceFactory _streamingSourceFactory;

        public StreamerFactoryTest()
        {
            _kernel = new MoqMockingKernel();
            _kernel.Bind<IStreamingSourceFactory>().To<StreamingSourceFactory>();
        }

        [TestInitialize]
        public void TestInitialize()
        {
            _kernel.Reset();
            _streamingSourceFactory = _kernel.Get<IStreamingSourceFactory>();
        }

        [TestMethod]
        public void GetAudioStreamer_ShouldReturnSameStreamerTwice()
        {
            // Given
            var audioDevice = new AudioDevice("Some Id");

            // When
            var firstStreamer = _streamingSourceFactory.GetDevice(audioDevice);
            var secondStreamer = _streamingSourceFactory.GetDevice(audioDevice);

            // Then
            firstStreamer.Should().NotBeNull();
            secondStreamer.Should().NotBeNull();
            secondStreamer.Should().Be(firstStreamer);
        }
    }
}
