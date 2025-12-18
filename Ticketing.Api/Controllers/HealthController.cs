using Microsoft.AspNetCore.Mvc;
using Ticketing.Api.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;   
using Microsoft.AspNetCore.Authorization;

namespace Ticketing.Api.Controllers;

[ApiController]
[Route("api/health")]
public class HealthController : ControllerBase
{
    private readonly AppDbContext _db;

    public HealthController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public IActionResult Public()
    {
        return Ok("Public endpoint works");
    }

    [HttpGet("db")]
    public IActionResult Db()
    {
        try
        {
            bool hasUsers = _db.Users.Any();
            return Ok(new { DatabaseConnected = true, HasUsers = hasUsers });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { DatabaseConnected = false, Error = ex.Message });
        }
    }

    // PROTECTED ENDPOINT
    [Authorize(Roles = "Agent,Admin")]
    [HttpGet("secure")]
    public IActionResult Secure()
    {
        return Ok("You are authorized");
    }
}
