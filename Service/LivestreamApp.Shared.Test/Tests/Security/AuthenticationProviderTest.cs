using FluentAssertions;
using LivestreamApp.Shared.AppSettings;
using LivestreamApp.Shared.Security;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Ninject;
using Ninject.MockingKernel.Moq;
using System.Collections.Generic;

namespace LivestreamApp.Shared.Test.Tests.Security
{
    [TestClass]
    public class AuthenticationProviderTest
    {
        private readonly MoqMockingKernel _kernel;
        private IAuthenticationProvider _authenticationProvider;
        private Mock<IAppSettingsProvider> _mockAppSettingsProvider;

        public AuthenticationProviderTest()
        {
            _kernel = new MoqMockingKernel();
            _kernel.Bind<IAuthenticationProvider>().To<AuthenticationProvider>();
        }

        [TestInitialize]
        public void TestInitialize()
        {
            _kernel.Reset();
            _authenticationProvider = _kernel.Get<IAuthenticationProvider>();
            _mockAppSettingsProvider = _kernel.GetMock<IAppSettingsProvider>();
        }

        [TestMethod]
        public void SetAuthenticationHas_ShouldSetRightMd5HasValue()
        {
            // Given
            var newPassword = "MySecureNewPassword";
            var md5Hash = "5b019e6e8062af413f4055b88fa5e7b2";

            // When
            _authenticationProvider.SetAuthenticationHash(newPassword);

            // Then
            _mockAppSettingsProvider
                .Verify(masp => masp.SetStringValue(AppSetting.AuthenticationHash, md5Hash), Times.Once);
        }

        [TestMethod]
        public void Validate_ValidHash_ShouldReturnCorrectUserIdentity()
        {
            // Given
            var md5Hash = "5b019e6e8062af413f4055b88fa5e7b2";
            _mockAppSettingsProvider
                .Setup(masp => masp.GetStringValue(AppSetting.AuthenticationHash))
                .Returns(md5Hash);

            // When
            var userIdentity = _authenticationProvider.Validate(md5Hash);

            // Then
            userIdentity.Should().NotBeNull();
            userIdentity.UserName.Should().Be("Admin");
            userIdentity.Claims.Should().Equal(new List<string> { "ACCESS-BACKEND" });
        }

        [TestMethod]
        public void Validate_InvalidHash_ShouldReturnNull()
        {
            // Given
            var md5Hash = "5b019e6e8062af413f4055b88fa5e7b2";
            _mockAppSettingsProvider
                .Setup(masp => masp.GetStringValue(AppSetting.AuthenticationHash))
                .Returns(md5Hash);

            // When
            var userIdentity = _authenticationProvider.Validate("InvalidString");

            // Then
            userIdentity.Should().BeNull();
        }
    }
}
