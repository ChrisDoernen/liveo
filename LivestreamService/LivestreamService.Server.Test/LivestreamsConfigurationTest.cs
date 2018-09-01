using AutoMapper;
using LivestreamService.Server.Configuration;
using LivestreamService.Server.Entities;
using LivestreamService.Server.Streaming;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Linq;

namespace LivestreamService.Server.Test
{
    [TestClass]
    public class LivestreamsConfigurationTest
    {
        [TestMethod]
        public void GetAvailableStreams_ValidConfig()
        {
            // Arrange
            const string validConfig = "TestResources\\config\\ValidLivestreams.config";
            Mapper.Initialize(config =>
            {
                config.CreateMap<LivestreamsType, LiveStreams>()
                    .ForMember(dest => dest.Livestreams, opt => opt.MapFrom(src => src.LiveStream.ToList()))
                    .IgnoreAllUnmapped();

                config.CreateMap<LivestreamType, LiveStream>()
                    .IgnoreAllUnmapped();
            });

            var livestreamsConfiguration = new LivestreamsConfiguration();

            var expectedLivestreamDeutsch = new LiveStream
            {
                Id = "deutsch",
                Title = "Deutsch",
                CountryCode = "de",
                Description = "Originalton",
                AudioInput = "Mikrofonarray (Realtek High Definition Audio)",
                StartOnServiceStartup = true
            };

            var expectedLivestreamEnglish = new LiveStream
            {
                Id = "english",
                Title = "English",
                CountryCode = "gb",
                Description = "Originalton",
                AudioInput = "Mikrofon (2- USB Audio Device)",
                StartOnServiceStartup = false
            };

            var expectedLivestreams = new LiveStreams();
            expectedLivestreams.Livestreams.Add(expectedLivestreamDeutsch);
            expectedLivestreams.Livestreams.Add(expectedLivestreamEnglish);

            // Act
            var livestreams = livestreamsConfiguration.GetAvailableStreams(validConfig);

            // Assert
            Assert.IsNotNull(livestreams);
            Assert.AreEqual(expectedLivestreams.Livestreams.Count, livestreams.Livestreams.Count);
            Assert.AreEqual(expectedLivestreams.Livestreams[0].Id, livestreams.Livestreams[0].Id);
            Assert.AreEqual(expectedLivestreams.Livestreams[1].Title, livestreams.Livestreams[1].Title);
        }


    }
}
