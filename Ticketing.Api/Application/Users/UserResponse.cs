namespace Ticketing.Api.Application.Users;

public record UserResponse(
    Guid Id,
    string Name,
    string Email,
    string Role
);
