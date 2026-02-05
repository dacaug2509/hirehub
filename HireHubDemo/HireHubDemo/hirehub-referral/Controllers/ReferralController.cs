using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HireHub.Referral.Data;
using HireHub.Referral.Models;
using System.Security.Claims;

namespace HireHub.Referral.Controllers
{
    [Route("api/referral")]
    [ApiController]
    [Authorize] // Requires JWT
    public class ReferralController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ReferralController(AppDbContext context)
        {
            _context = context;
        }

        private async Task<Employee> GetCurrentEmployee()
        {
            var email = User.Identity.Name; // Mapped from ClaimTypes.Name
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null) return null;
            return await _context.Employees.FirstOrDefaultAsync(e => e.UserId == user.Id);
        }

        [HttpGet("jobs")]
        public async Task<IActionResult> GetCompanyJobs()
        {
            var employee = await GetCurrentEmployee();
            if (employee == null) return Unauthorized();

            var jobs = await _context.Jobs
                .Where(j => j.CompanyId == employee.CompanyId && j.Status == "OPEN")
                .ToListAsync();
            return Ok(jobs);
        }

        [HttpGet("candidates")]
        public async Task<IActionResult> SearchCandidates([FromQuery] string name)
        {
            var candidates = await _context.Candidates
                .Where(c => c.Name.Contains(name))
                .ToListAsync();
            return Ok(candidates);
        }

        [HttpPost("refer")]
        public async Task<IActionResult> ReferCandidate([FromQuery] long jobId, [FromQuery] long candidateId)
        {
            var employee = await GetCurrentEmployee();
            if (employee == null) return Unauthorized();

            // Check if already referred (optional but good)
            var exists = await _context.Referrals.AnyAsync(r => r.JobId == jobId && r.CandidateId == candidateId);
            if (exists) return BadRequest("Already referred");

            var referral = new Referral
            {
                JobId = jobId,
                CandidateId = candidateId,
                EmployeeId = employee.Id,
                ReferralDate = DateTime.UtcNow
            };

            _context.Referrals.Add(referral);
            await _context.SaveChangesAsync();
            return Ok("Candidate Referred Successfully");
        }
    }
}
