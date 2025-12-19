using Microsoft.AspNetCore.Mvc;

namespace Ticketing.Api.Controllers
{
    [ApiController]
    [Route("api/health")]
    public class HealthController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(new
            {
                status = "OK",
                message = "Backend is running without database",
                time = DateTime.UtcNow
            });
        }
    }
}
