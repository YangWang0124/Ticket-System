using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Ticketing.Api.Application.Tickets;
using Ticketing.Api.Domain.Entities;
using Ticketing.Api.Infrastructure.Data;

namespace Ticketing.Api.Controllers;

[ApiController]
[Route("api/tickets")]
public class TicketController : ControllerBase
{
    private readonly AppDbContext _db;

    public TicketController(AppDbContext db)
    {
        _db = db;
    }

    // CUSTOMER: Create ticket
    [Authorize(Roles = "Customer")]
    [HttpPost]
    public async Task<IActionResult> Create(CreateTicketRequest request)
    {
        var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var ticket = new Ticket
        {
            Title = request.Title,
            Description = request.Description,
            CreatedByUserId = userId
        };

        _db.Tickets.Add(ticket);
        await _db.SaveChangesAsync();

        return Ok(ticket.Id);
    }

    // AGENT / ADMIN: View all tickets
    [Authorize(Roles = "Agent,Admin")]
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var tickets = await _db.Tickets
            .Include(t => t.CreatedBy)
            .OrderByDescending(t => t.CreatedAt)
            .ToListAsync();

        return Ok(tickets);
    }

    // ANY AUTHENTICATED USER: View single ticket
    [Authorize]
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var ticket = await _db.Tickets
            .Include(t => t.CreatedBy)
            .FirstOrDefaultAsync(t => t.Id == id);

        if (ticket == null)
            return NotFound();

        return Ok(ticket);
    }

    // AGENT / ADMIN: Update ticket status
    [Authorize(Roles = "Agent,Admin")]
    [HttpPatch("{id}/status")]
    public async Task<IActionResult> UpdateStatus(Guid id, UpdateTicketStatusRequest request)
    {
        var ticket = await _db.Tickets.FindAsync(id);
        if (ticket == null)
            return NotFound();

        ticket.Status = request.Status;
        await _db.SaveChangesAsync();

        return Ok();
    }
}
