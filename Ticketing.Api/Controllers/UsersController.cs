using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Ticketing.Api.Application.Users;
using Ticketing.Api.Infrastructure.Data;

namespace Ticketing.Api.Controllers;

[ApiController]
[Route("api/dev/users")]
public class UsersController : ControllerBase
{
    private readonly AppDbContext _db;

    public UsersController(AppDbContext db)
    {
        _db = db;
    }

    // DEV ONLY — REMOVE IN PRODUCTION
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var users = await _db.Users
            .Select(u => new UserResponse(
                u.Id,
                u.Name,
                u.Email,
                u.Role
            ))
            .ToListAsync();

        return Ok(users);
    }
}
