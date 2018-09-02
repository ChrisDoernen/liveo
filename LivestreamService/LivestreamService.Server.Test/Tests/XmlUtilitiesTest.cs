using LivestreamService.Server.Entities;
using LivestreamService.Server.Utilities;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Xml.Schema;

namespace LivestreamService.Server.Test.Tests
{
    [TestClass]
    public class XmlUtilitiesTest
    {
        private const string XsdResource = "LivestreamService.Server.Livestreams.xsd";

        [TestMethod]
        public void ReadFromFile_ValidConfig()
        {
            // Arrange
            const string validConfig = "TestResources\\config\\ValidLivestreams.config";

            // Act
            var deserialized = XmlUtilities.ValidateAndDeserialize<LivestreamsType>(validConfig, XsdResource);

            // Assert
            Assert.AreEqual(2, deserialized.LiveStream.Length);
            Assert.AreEqual("deutsch", deserialized.LiveStream[0].Id);
            Assert.AreEqual("de", deserialized.LiveStream[0].CountryCode);
            Assert.AreEqual("Originalton", deserialized.LiveStream[0].Description);
        }

        [TestMethod]
        [ExpectedException(typeof(InvalidOperationException))]
        public void ReadFromConfigFile_InvalidNamespace()
        {
            // Arrange
            const string invalidNamespaceConfig = "TestResources\\config\\InvalidNamespaceLivestreams.config";

            // Act
            var deserialized = XmlUtilities.ValidateAndDeserialize<LivestreamsType>(invalidNamespaceConfig, XsdResource);
        }

        [TestMethod]
        [ExpectedException(typeof(XmlSchemaValidationException))]
        public void ReadFromConfigFile_InvalidConfig()
        {
            // Arrange
            const string invalidConfig = "TestResources\\config\\InvalidLivestreams.config";

            // Act
            var deserialized = XmlUtilities.ValidateAndDeserialize<LivestreamsType>(invalidConfig, XsdResource);
        }
    }
}
