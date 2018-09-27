using FluentAssertions;
using LivestreamApp.Server.Shared.XmlSerialization;
using LivestreamApp.Server.Streaming.Entities;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Xml.Schema;

namespace LivestreamApp.Server.Test.Tests.Shared.XmlSerialization
{
    [TestClass]
    public class XmlUtilitiesTest
    {
        private const string XsdResource = "LivestreamApp.Server.Livestreams.xsd";

        [TestMethod]
        public void ValidateAndDeserialize_ValidConfig_ShouldReturnCorrectObject()
        {
            // Given
            const string validConfig = "TestResources\\config\\ValidLivestreams.config";

            // When
            var deserialized = XmlUtilities.ValidateAndDeserialize<LivestreamsType>(validConfig, XsdResource);

            // Then
            deserialized.LiveStream.Length.Should().Be(2);
            deserialized.LiveStream[0].Id.Should().Be("deutsch");
            deserialized.LiveStream[0].CountryCode.Should().Be("de");
            deserialized.LiveStream[0].Description.Should().Be("Originalton");
        }

        [TestMethod]
        [ExpectedException(typeof(InvalidOperationException))]
        public void ReadFromConfigFile_InvalidNamespace()
        {
            // Given
            const string invalidNamespaceConfig = "TestResources\\config\\InvalidNamespaceLivestreams.config";

            // When
            var deserialized = XmlUtilities.ValidateAndDeserialize<LivestreamsType>(invalidNamespaceConfig, XsdResource);
        }

        [TestMethod]
        [ExpectedException(typeof(XmlSchemaValidationException))]
        public void ReadFromConfigFile_InvalidConfig()
        {
            // Given
            const string invalidConfig = "TestResources\\config\\InvalidLivestreams.config";

            // When
            var deserialized = XmlUtilities.ValidateAndDeserialize<LivestreamsType>(invalidConfig, XsdResource);
        }
    }
}
