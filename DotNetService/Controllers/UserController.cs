using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/users")]
public class UserController : ControllerBase
{
    [HttpGet]
    public IActionResult GetUsers()
    {
        return Ok("Dummy .NET Service Running");
    }
}