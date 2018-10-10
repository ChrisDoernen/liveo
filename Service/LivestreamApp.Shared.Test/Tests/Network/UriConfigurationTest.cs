﻿using FluentAssertions;
using LivestreamApp.Shared.AppSettings;
using LivestreamApp.Shared.Network;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Ninject;
using Ninject.MockingKernel.Moq;

namespace LivestreamApp.Shared.Test.Tests.Network
{
    [TestClass]
    public class UriConfigurationTest
    {
        private readonly MoqMockingKernel _kernel;
        private Mock<IAppSettingsProvider> _appSettingsProvider;
        private IUriConfiguration _uriConfiguration;

        public UriConfigurationTest()
        {
            _kernel = new MoqMockingKernel();
            _kernel.Bind<IUriConfiguration>().To<UriConfiguration>();
        }

        [TestInitialize]
        public void TestInitialize()
        {
            _kernel.Reset();
            _appSettingsProvider = _kernel.GetMock<IAppSettingsProvider>();
            _uriConfiguration = _kernel.Get<IUriConfiguration>();
        }

        [TestMethod]
        public void GetWsUri_ShouldReturnCorrectUri()
        {
            // Given
            _appSettingsProvider
                .Setup(masp => masp.GetIntValue(It.IsAny<AppSetting>()))
                .Returns(1234);

            // When 
            var wsUri = _uriConfiguration.GetWsUri();

            // Then
            wsUri.Should().Be("ws://localhost:1234/");
        }

        [TestMethod]
        public void GetHttpUri_ShouldReturnCorrectUri()
        {
            // Given
            _appSettingsProvider
                .Setup(masp => masp.GetIntValue(It.IsAny<AppSetting>()))
                .Returns(4321);

            // When 
            var wsUri = _uriConfiguration.GetHttpUri();

            // Then
            wsUri.Should().Be("http://localhost:4321/");
        }

    }
}