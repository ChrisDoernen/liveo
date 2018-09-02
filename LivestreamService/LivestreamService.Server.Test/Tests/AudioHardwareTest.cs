using LivestreamService.Server.Environment;
using LivestreamService.Server.Utilities;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Ninject.Extensions.Logging;
using System.Collections.Generic;

namespace LivestreamService.Server.Test.Tests
{
    [TestClass]
    public class AudioHardwareTest
    {
        [TestMethod]
        public void GetAudioInputs_DummyInput()
        {
            // Arrange
            var mockLogger = new Mock<ILogger>();
            var mockExternalProcess = new Mock<IExternalProcess>();
            const string listDevicesCommand = @"ffmpeg -list_devices true -f dshow -i dummy -hide_banner";
            var audioConfiguration = new AudioHardware(mockLogger.Object, mockExternalProcess.Object);
            var mockLines = new List<string>
            {
                "[dshow @ 0000023e3e56a1c0] DirectShow video devices (some may be both video and audio devices)",
                "[dshow @ 0000023e3e56a1c0]  \"USB Boot\"",
                "[dshow @ 0000023e3e56a1c0]     Alternative name \"@device_pnp_\\\\?\\usb#vid_0bda&pid_5846&mi_00#6&18d0fbe5&0&0000#{65e8773d-8f56-11d0-a3b9-00a0c9223196}\\global\"",
                "[dshow @ 0000023e3e56a1c0] DirectShow audio devices",
                "[dshow @ 0000023e3e56a1c0]  \"Mikrofonarray (Realtek High Definition Audio)\"",
                "[dshow @ 0000023e3e56a1c0]     Alternative name \"@device_cm_{33D9A762-90C8-11D0-BD43-00A0C911CE86}\\wave_{810AC879-96E4-4CF7-856C-CF8CC0784E7D}\"",
                "dummy: Immediate exit requested"
            };

            mockExternalProcess.Setup(mep => mep.ExecuteCommandAndWaitForExit(listDevicesCommand))
                .Callback(() =>
                {
                    foreach (var mockLine in mockLines)
                    {
                        mockExternalProcess.Raise(m => m.ErrorDataReceived += null, new CustomDataReceivedEventArgs(mockLine));
                    }
                })
                .Returns(0);

            // Act
            var audioInputs = audioConfiguration.GetAudioInputs();

            // Assert
            Assert.IsNotNull(audioInputs);
            Assert.AreEqual(1, audioInputs.Count);
            Assert.AreEqual("Mikrofonarray (Realtek High Definition Audio)", audioInputs[0].Id);
        }

        [TestMethod]
        public void GetAudioInputs_NoInputs()
        {
            // Arrange
            var mockLogger = new Mock<ILogger>();
            var mockExternalProcess = new Mock<IExternalProcess>();
            const string listDevicesCommand = @"ffmpeg -list_devices true -f dshow -i dummy -hide_banner";
            var audioConfiguration = new AudioHardware(mockLogger.Object, mockExternalProcess.Object);
            var mockLines = new List<string>
            {
                "[dshow @ 0000023e3e56a1c0] DirectShow video devices (some may be both video and audio devices)",
                "[dshow @ 0000023e3e56a1c0]  \"USB Boot\"",
                "[dshow @ 0000023e3e56a1c0]     Alternative name \"@device_pnp_\\\\?\\usb#vid_0bda&pid_5846&mi_00#6&18d0fbe5&0&0000#{65e8773d-8f56-11d0-a3b9-00a0c9223196}\\global\"",
                "dummy: Immediate exit requested"
            };

            mockExternalProcess.Setup(foo => foo.ExecuteCommandAndWaitForExit(listDevicesCommand))
                .Callback(() =>
                {
                    foreach (var mockLine in mockLines)
                    {
                        mockExternalProcess.Raise(m => m.ErrorDataReceived += null, new CustomDataReceivedEventArgs(mockLine));
                    }
                })
                .Returns(0);

            // Act
            var audioInputs = audioConfiguration.GetAudioInputs();

            // Assert
            Assert.IsNotNull(audioInputs);
            Assert.AreEqual(0, audioInputs.Count);
        }
    }
}
