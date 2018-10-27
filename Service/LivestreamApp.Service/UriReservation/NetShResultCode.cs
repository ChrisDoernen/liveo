/* Adapted from: https://github.com/justeat/Topshelf.Nancy */

namespace LivestreamApp.Service.UriReservation
{
    public enum NetShResultCode
    {
        Error = -1,
        Success = 0,
        UrlReservationAlreadyExists = 183,
        UrlReservationDoesNotExist = 2
    }
}