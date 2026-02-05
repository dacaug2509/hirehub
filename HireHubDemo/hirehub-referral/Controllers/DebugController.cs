using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HireHub.Referral.Controllers
{
    [ApiController]
    [Route("api/debug")]
    public class DebugController : ControllerBase
    {
        // 🔹 Basic routing test (NO auth, NO DB)
 
        [HttpGet("ping")]
        public IActionResult Ping()
        {
            return Ok("Debug controller is working");
        }

        // 🔹 Extra sanity check
        [HttpGet("info")]
        public IActionResult Info()
        {
            return Ok(new
            {
                Controller = "DebugController",
                Status = "Reachable"
            });
        }
    }
}
