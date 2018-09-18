namespace LivestreamApp.Shared.Network
{
    public interface IUriConfiguration
    {
        string GetHttpUri();
        string GetWsUri();
    }
}
