using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HireHub.Referral.Data;
using HireHub.Referral.Models;

namespace HireHub.Referral.Controllers
{
    [Route("api/referal")]
    [ApiController]
    public class ReferalResponseController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ReferalResponseController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/referal/employee/5
        
        [HttpGet("employee/{empId}")]
        public async Task<IActionResult> GetReferralsByEmployee(long empId)
        {
            var referrals = await _context.Referrals
                .Include(r => r.Job)
                .Include(r => r.Candidate)
                .Include(r => r.Employee)
                .Where(r => r.EmployeeId == empId)
                .Select(r => new
                {
                    r.Id,
                    r.JobId,
                    r.CandidateId,
                    JobTitle = r.Job != null ? r.Job.Title : null,
                    CandidateName = r.Candidate != null ? r.Candidate.Name : null,
                    ReferrerName = r.Employee != null ? r.Employee.Name : null,
                    r.ReferralDate,
                    Status = r.Status.ToString()
                })
                .ToListAsync();

            if (referrals.Count == 0)
                return Ok(new List<object>()); // return empty list, not error

            return Ok(referrals);
        }
    }
}
