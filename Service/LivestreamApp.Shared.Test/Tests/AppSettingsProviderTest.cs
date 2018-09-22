using FluentAssertions;
using LivestreamApp.Shared.AppSettings;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Ninject;
using Ninject.MockingKernel.Moq;
using System;

namespace LivestreamApp.Shared.Test.Tests
{
    [TestClass]
    public class AppSettingsProviderTest
    {
        private readonly MoqMockingKernel _kernel;
        private IAppSettingsProvider _appSettingsProvider;
        private Mock<IConfigurationManagerAdapter> _mockConfigurationManagerAdapter;

        public AppSettingsProviderTest()
        {
            _kernel = new MoqMockingKernel();
            _kernel.Bind<IAppSettingsProvider>().To<AppSettingsProvider>();
        }

        [TestInitialize]
        public void TestInittialize()
        {
            _kernel.Reset();
            _mockConfigurationManagerAdapter = _kernel.GetMock<IConfigurationManagerAdapter>();
            _appSettingsProvider = _kernel.Get<IAppSettingsProvider>();
        }

        [TestMethod]
        public void GetStringValue_ValidInput_ShouldReturnCorrectValue()
        {
            // Given
            _mockConfigurationManagerAdapter
                .Setup(mcma => mcma.GetAppSetting(It.IsAny<string>()))
                .Returns("SomeAppSetting");

            // When
            var setting = _appSettingsProvider.GetStringValue(AppSetting.DefaultPort);

            // Then
            setting.Should().NotBeNullOrEmpty();
            setting.Should().Be("SomeAppSetting");
        }

        [TestMethod]
        public void GetIntValue_ValidInput_ShouldReturnCorrectValue()
        {
            // Given
            _mockConfigurationManagerAdapter
                .Setup(mcma => mcma.GetAppSetting(It.IsAny<string>()))
                .Returns("8080");

            // When
            var setting = _appSettingsProvider.GetIntValue(AppSetting.DefaultPort);

            // Then
            setting.Should().Be(8080);
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentException))]
        public void GetIntValue_InValidInput_ShouldThrow()
        {
            // Given
            _mockConfigurationManagerAdapter
                .Setup(mcma => mcma.GetAppSetting(It.IsAny<string>()))
                .Returns("SomeStringAppSetting");

            // When
            var setting = _appSettingsProvider.GetIntValue(AppSetting.DefaultPort);
        }
    }
}
