using FluentAssertions;
using LivestreamApp.Shared.AppSettings;
using Moq;
using Ninject;
using Ninject.MockingKernel.Moq;
using NUnit.Framework;
using System;

namespace LivestreamApp.Shared.Test.Tests.AppSettings
{
    [TestFixture]
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

        [SetUp]
        public void TestInittialize()
        {
            _kernel.Reset();
            _mockConfigurationManagerAdapter = _kernel.GetMock<IConfigurationManagerAdapter>();
            _appSettingsProvider = _kernel.Get<IAppSettingsProvider>();
        }

        [Test]
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

        [Test]
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

        [Test]
        public void GetIntValue_InValidInput_ShouldThrow()
        {
            // Given
            _mockConfigurationManagerAdapter
                .Setup(mcma => mcma.GetAppSetting(It.IsAny<string>()))
                .Returns("SomeStringAppSetting");

            // When
            Assert.Throws<FormatException>(() => _appSettingsProvider.GetIntValue(AppSetting.DefaultPort));
        }

        [Test]
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

        [Test]
        public void SetStringValue_NoKey_ShouldThrow()
        {
            // Given
            _mockConfigurationManagerAdapter
                .Setup(mcma => mcma.GetAppSetting(It.IsAny<string>()))
                .Returns((string)null);

            // When
            Assert.Throws<ArgumentException>(() => _appSettingsProvider.GetStringValue(AppSetting.AuthenticationHash));
        }

        [Test]
        public void ValidateAppSettingKeys_AllKeysExisting_ShouldNotThrow()
        {
            // Given
            _mockConfigurationManagerAdapter
                .Setup(mcma => mcma.GetAppSetting(It.IsAny<string>()))
                .Returns("SomeValue");

            // When
            _appSettingsProvider.ValidateAppSettingsKeys();
        }

        [Test]
        public void ValidateAppSettingKeys_KeyNotExisting_ShouldThrow()
        {
            // Given
            var authenticationHash = AppSetting.AuthenticationHash.ToString();
            string Returns(string x) => x == authenticationHash ? null : "SomeValue";

            _mockConfigurationManagerAdapter
                .Setup(mcma => mcma.GetAppSetting(It.IsAny<string>()))
                .Returns((Func<string, string>)Returns);

            // When
            Assert.Throws<ArgumentException>(() => _appSettingsProvider.ValidateAppSettingsKeys());
        }
    }
}
