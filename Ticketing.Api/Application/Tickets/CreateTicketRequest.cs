namespace Ticketing.Api.Application.Tickets;

public record CreateTicketRequest(
    string Title,
    string Description
);
