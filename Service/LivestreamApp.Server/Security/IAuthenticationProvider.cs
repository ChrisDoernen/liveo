namespace LivestreamApp.Server.Security
{
    /// <summary>
    ///     Provides authentication
    /// </summary>
    public interface IAuthenticationProvider
    {
        /// <summary>
        ///     Sets a new authentication hash from a given password
        /// </summary>
        /// <param name="password"></param>
        void SetAuthenticationHash(string password);

        /// <summary>
        ///     Determines if the given token is valid
        /// </summary>
        /// <param name="input">Hash of the password</param>
        /// <returns>True if valid, otherwise false</returns>
        bool IsAuthenticationHashValid(string input);
    }
}
