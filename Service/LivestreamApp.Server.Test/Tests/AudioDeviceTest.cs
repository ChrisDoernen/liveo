using FluentAssertions;
using LivestreamApp.Server.Streaming.Environment;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace LivestreamApp.Server.Test.Tests
{
    [TestClass]
    public class AudioDeviceTest
    {
        private readonly AudioDevice _audioDevice = new AudioDevice("Mikro");

        [TestMethod]
        public void Equals_ShouldGetRightValueWhenNotTheSame()
        {
            // Given
            var secondAudioDevice = new AudioDevice("Other mikro");

            // When
            var areSame = _audioDevice.Equals(secondAudioDevice);

            // Then
            areSame.Should().Be(false);
        }

        [TestMethod]
        public void Equals_ShouldGetRightValueWhenTheSame()
        {
            // Given
            var secondAudioDevice = _audioDevice;

            // When
            var areSame = _audioDevice.Equals(secondAudioDevice);

            // Then
            areSame.Should().Be(true);
        }
    }
}
