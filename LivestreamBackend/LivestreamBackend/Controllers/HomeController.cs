using System.Web.Mvc;

namespace LivestreamBackend.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}