using Nancy.Security;
using System.Collections.Generic;

namespace LivestreamApp.Shared.Security
{
    public class UserIdentity : IUserIdentity
    {
        public string UserName { get; }
        public IEnumerable<string> Claims { get; }

        public UserIdentity(string userName, IEnumerable<string> claims)
        {
            UserName = userName;
            Claims = claims;
        }
    }
}
