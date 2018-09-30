using FluentAssertions;
using LivestreamApp.Server.Security;
using LivestreamApp.Shared.AppSettings;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Ninject;
using Ninject.MockingKernel.Moq;

namespace LivestreamApp.Server.Test.Tests.Security
{
    [TestClass]
    public class AuthenticationServiceTest
    {
        private readonly MoqMockingKernel _kernel;
        private IAuthenticationService _authenticationService;
        private Mock<IAppSettingsProvider> _mockAppSettingsProvider;

        public AuthenticationServiceTest()
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
        }

        [TestMethod]
        public void SetAuthenticationHas_ShouldSetRightMd5HasValue()
        {
            // Given
            var newPassword = "MySecureNewPassword";
            var md5Hash = "5b019e6e8062af413f4055b88fa5e7b2";

            // When
            _authenticationService.SetAuthenticationHash(newPassword);

            // Then
            _mockAppSettingsProvider
                .Verify(masp => masp.SetStringValue(AppSetting.AuthenticationHash, md5Hash), Times.Once);
        }

        [TestMethod]
        public void IsAuthenticationHasValid_ShouldEvaluateRight()
        {
            // Given
            var md5Hash = "5b019e6e8062af413f4055b88fa5e7b2";
            _mockAppSettingsProvider
                .Setup(masp => masp.GetStringValue(AppSetting.AuthenticationHash))
                .Returns(md5Hash);

            // When
            var incorrect = _authenticationService.IsAuthenticationHashValid("1nc0rrect");
            var correct = _authenticationService.IsAuthenticationHashValid(md5Hash);

            // Then
            incorrect.Should().Be(false);
            correct.Should().Be(true);
        }
    }
}
