using FluentAssertions;
using LivestreamApp.Shared.AppSettings;
using LivestreamApp.Shared.Authentication;
using LivestreamApp.Shared.Utilities;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Ninject;
using Ninject.MockingKernel.Moq;
using System.Collections.Generic;

namespace LivestreamApp.Shared.Test.Tests.Authentication
{
    [TestClass]
    public class AuthenticationProviderTest
    {
        private readonly MoqMockingKernel _kernel;
        private IAuthenticationService _authenticationService;
        private Mock<IAppSettingsProvider> _mockAppSettingsProvider;
        private Mock<IHashGenerator> _mockHashGenerator;

        public AuthenticationProviderTest()
        {
            _kernel = new MoqMockingKernel();
            _kernel.Bind<IAuthenticationService>().To<AuthenticationService>();
        }

        [TestInitialize]
        public void TestInitialize()
        {
            _kernel.Reset();
            _authenticationService = _kernel.Get<IAuthenticationService>();
            _mockAppSettingsProvider = _kernel.GetMock<IAppSettingsProvider>();
            _mockHashGenerator = _kernel.GetMock<IHashGenerator>();
        }

        [TestMethod]
        public void SetAuthenticationHas_ShouldSetRightMd5HasValue()
        {
            // Given
            var newPassword = "MySecureNewPassword";
            var md5Hash = "5b019e6e8062af413f4055b88fa5e7b2";
            _mockHashGenerator
                .Setup(mhg => mhg.GetMd5Hash(It.IsAny<string>()))
                .Returns(md5Hash);

            // When
            _authenticationService.SetAuthenticationHash(newPassword);

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
            var userIdentity = _authenticationService.Validate(md5Hash);

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
            var userIdentity = _authenticationService.Validate("InvalidString");

            // Then
            userIdentity.Should().BeNull();
        }
    }
}
