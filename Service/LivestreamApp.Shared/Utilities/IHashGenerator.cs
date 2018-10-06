using System;

namespace LivestreamApp.Shared.Utilities
{
    public interface IHashGenerator : IDisposable
    {
        string GetMd5Hash(string input);
    }
}