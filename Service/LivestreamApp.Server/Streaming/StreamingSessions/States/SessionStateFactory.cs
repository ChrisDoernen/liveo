using Ninject;
using Ninject.Parameters;
using Ninject.Syntax;
using System;

namespace LivestreamApp.Server.Streaming.StreamingSessions.States
{
    public class SessionStateFactory : ISessionStateFactory
    {
        private readonly IResolutionRoot _kernel;

        public SessionStateFactory(IResolutionRoot kernel)
        {
            _kernel = kernel ?? throw new ArgumentNullException(nameof(kernel));
        }

        public ISessionState GetSessionState<T>(ISession session) where T : ISessionState
        {
            return _kernel.Get<T>(new ConstructorArgument("session", session));
        }
    }
}
