namespace Ticketing.Api.Application.Auth;

public record RegisterRequest(
    string Name,
    string Email,
    string Password,
    string Role
);