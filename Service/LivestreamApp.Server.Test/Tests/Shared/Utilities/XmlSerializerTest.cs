using FluentAssertions;
using LivestreamApp.Server.Shared.Utilities;
using LivestreamApp.Server.Streaming.Livestreams.Entities;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Xml.Schema;

namespace LivestreamApp.Server.Test.Tests.Shared.Utilities
{
    [TestClass]
    public class XmlSerializerTest
    {
        private const string XsdResource = "LivestreamApp.Server.Livestreams.xsd";

        [TestMethod]
        public void ValidateAndDeserialize_ValidConfig_ShouldReturnCorrectObject()
        {
            // Given
            const string validConfig = "TestResources\\config\\ValidLivestreams.config";

            // When
            var deserialized = XmlSerializer.ValidateAndDeserialize<StreamsType>(validConfig, XsdResource);

            // Then
            deserialized.Streams.Length.Should().Be(2);
            deserialized.Streams[0].Id.Should().Be("deutsch");
            deserialized.Streams[0].CountryCode.Should().Be("de");
            deserialized.Streams[0].Description.Should().Be("Originalton");
        }

        [TestMethod]
        [ExpectedException(typeof(InvalidOperationException))]
        public void ReadFromConfigFile_InvalidNamespace()
        {
            // Given
            const string invalidNamespaceConfig = "TestResources\\config\\InvalidNamespaceLivestreams.config";

            // When
            var deserialized = XmlSerializer.ValidateAndDeserialize<StreamsType>(invalidNamespaceConfig, XsdResource);
        }

        [TestMethod]
        [ExpectedException(typeof(XmlSchemaValidationException))]
        public void ReadFromConfigFile_InvalidConfig()
        {
            // Given
            const string invalidConfig = "TestResources\\config\\InvalidLivestreams.config";

            // When
            var deserialized = XmlSerializer.ValidateAndDeserialize<StreamsType>(invalidConfig, XsdResource);
        }
    }
}
