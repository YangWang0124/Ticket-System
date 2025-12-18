namespace Ticketing.Api.Domain.Entities;

public class Ticket
{
    public Guid Id { get; set; }
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public string Category { get; set; } = "";
    public string Priority { get; set; } = "Normal";
    public string Status { get; set; } = "Open";

    public Guid CreatedByUserId { get; set; }
    public User? CreatedBy { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
