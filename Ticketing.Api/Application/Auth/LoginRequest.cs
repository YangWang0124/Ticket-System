namespace Ticketing.Api.Application.Auth;

public record LoginRequest(
    string Email,
    string Password
);