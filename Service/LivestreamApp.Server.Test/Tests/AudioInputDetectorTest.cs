using FluentAssertions;
using LivestreamApp.Server.Streaming.Environment;
using LivestreamApp.Server.Streaming.ProcessCommunication;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Ninject.Extensions.Logging;
using System.Collections.Generic;
using System.Diagnostics;

namespace LivestreamApp.Server.Test.Tests
{
    [TestClass]
    public class AudioInputDetectorTest
    {
        private readonly Mock<ILogger> _mockLogger = new Mock<ILogger>();
        private readonly Mock<IProcessExecutor> _mockExternalProcess = new Mock<IProcessExecutor>();
        private IAudioInputDetector _audioInputDetector;

        [TestInitialize]
        public void TestInitialize()
        {
            _audioInputDetector = new AudioInputDetector(_mockLogger.Object, _mockExternalProcess.Object);
        }

        [TestMethod]
        public void GetAudioInputs_DummyInput_ShouldReturnCorrectAudioInput()
        {
            // Given
            var processOutput = new List<string>
            {
                "[dshow @ 0000023e3e56a1c0] DirectShow video devices (some may be both video and audio devices)",
                "[dshow @ 0000023e3e56a1c0]  \"USB Boot\"",
                "[dshow @ 0000023e3e56a1c0]     Alternative name \"@device_pnp_\\\\?\\usb#vid_0bda&pid_5846&mi_00#6&18d0fbe5&0&0000#{65e8773d-8f56-11d0-a3b9-00a0c9223196}\\global\"",
                "[dshow @ 0000023e3e56a1c0] DirectShow audio devices",
                "[dshow @ 0000023e3e56a1c0]  \"Mikrofonarray (Realtek High Definition Audio)\"",
                "[dshow @ 0000023e3e56a1c0]     Alternative name \"@device_cm_{33D9A762-90C8-11D0-BD43-00A0C911CE86}\\wave_{810AC879-96E4-4CF7-856C-CF8CC0784E7D}\"",
                "dummy: Immediate exit requested"
            };

            _mockExternalProcess.Setup(mep => mep.ExecuteProcess(It.IsAny<ProcessStartInfo>()))
                .Callback(() =>
                {
                    foreach (var line in processOutput)
                    {
                        _mockExternalProcess.Raise(m => m.ErrorDataReceived += null, new CustomDataReceivedEventArgs(line));
                    }
                })
                .Returns(0);

            // When
            var audioInputs = _audioInputDetector.GetAudioInputs();

            // Then
            audioInputs.Should().NotBeNull();
            audioInputs.Count.Should().Be(1);
            audioInputs[0].Id.Should().Be("Mikrofonarray (Realtek High Definition Audio)");
        }

        [TestMethod]
        public void GetAudioInputs_NoInputs()
        {
            // Given
            var mockLines = new List<string>
            {
                "[dshow @ 0000023e3e56a1c0] DirectShow video devices (some may be both video and audio devices)",
                "[dshow @ 0000023e3e56a1c0]  \"USB Boot\"",
                "[dshow @ 0000023e3e56a1c0]     Alternative name \"@device_pnp_\\\\?\\usb#vid_0bda&pid_5846&mi_00#6&18d0fbe5&0&0000#{65e8773d-8f56-11d0-a3b9-00a0c9223196}\\global\"",
                "dummy: Immediate exit requested"
            };

            _mockExternalProcess.Setup(mep => mep.ExecuteProcess(It.IsAny<ProcessStartInfo>()))
                .Callback(() =>
                {
                    foreach (var mockLine in mockLines)
                    {
                        _mockExternalProcess.Raise(m => m.ErrorDataReceived += null, new CustomDataReceivedEventArgs(mockLine));
                    }
                })
                .Returns(0);

            // When
            var audioInputs = _audioInputDetector.GetAudioInputs();

            // Then
            audioInputs.Should().NotBeNull();
            audioInputs.Count.Should().Be(0);
        }
    }
}
