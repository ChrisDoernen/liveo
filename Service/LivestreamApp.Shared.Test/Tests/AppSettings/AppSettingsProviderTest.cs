using FluentAssertions;
using LivestreamApp.Shared.AppSettings;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Ninject;
using Ninject.MockingKernel.Moq;
using System;

namespace LivestreamApp.Shared.Test.Tests.AppSettings
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
        [ExpectedException(typeof(FormatException))]
        public void GetIntValue_InValidInput_ShouldThrow()
        {
            // Given
            _mockConfigurationManagerAdapter
                .Setup(mcma => mcma.GetAppSetting(It.IsAny<string>()))
                .Returns("SomeStringAppSetting");

            // When
            var setting = _appSettingsProvider.GetIntValue(AppSetting.DefaultPort);
        }

        [TestMethod]
        public void SetStringValue_ShouldSetValueCorrectly()
        {
            // Given
            var appSetting = AppSetting.AuthenticationHash;
            var valueToSet = "SomeValue";

            // When
            _appSettingsProvider.SetStringValue(appSetting, valueToSet);

            // Then
            _mockConfigurationManagerAdapter
                .Verify(mcma => mcma.SetAppSetting(appSetting.ToString(), valueToSet), Times.Once);
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentException))]
        public void SetStringValue_NoKey_ShouldThrow()
        {
            // Given
            _mockConfigurationManagerAdapter
                .Setup(mcma => mcma.GetAppSetting(It.IsAny<string>()))
                .Returns((string)null);

            // When
            _appSettingsProvider.GetStringValue(AppSetting.AuthenticationHash);
        }

        [TestMethod]
        public void ValidateAppSettingKeys_AllKeysExisting_ShouldNotThrow()
        {
            // Given
            _mockConfigurationManagerAdapter
                .Setup(mcma => mcma.GetAppSetting(It.IsAny<string>()))
                .Returns("SomeValue");

            // When
            _appSettingsProvider.ValidateAppSettingsKeys();
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentException))]
        public void ValidateAppSettingKeys_KeyNotExisting_ShouldThrow()
        {
            // Given
            var authenticationHash = AppSetting.AuthenticationHash.ToString();
            string Returns(string x) => x == authenticationHash ? null : "SomeValue";

            _mockConfigurationManagerAdapter
                .Setup(mcma => mcma.GetAppSetting(It.IsAny<string>()))
                .Returns((Func<string, string>)Returns);

            // When
            _appSettingsProvider.ValidateAppSettingsKeys();
        }
    }
}
