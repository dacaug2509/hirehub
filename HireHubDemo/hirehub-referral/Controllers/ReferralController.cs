using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HireHub.Referral.Data;
using HireHub.Referral.Models;
using HireHub.Referral.Dtos;
using HireHub.Referral.Services;
using System.Security.Claims;

namespace HireHub.Referral.Controllers
{
   
    [ApiController]
    [Route("api/referral")]
    [Authorize] // Requires JWT
    public class ReferralController : ControllerBase
    {
        private readonly IReferralService _referralService;
        private readonly AppDbContext _context; // Kept for existing methods not yet refactored or helpers

        public ReferralController(IReferralService referralService, AppDbContext context)
        {
            _referralService = referralService;
            _context = context;
        }


        [HttpGet("ping")]
        public IActionResult Ping()
        {
            return Ok("Referral Service is UP");
        }

        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
            var email = User.Identity.Name;
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null) return Unauthorized();
            var employee = await _context.Employees.FirstOrDefaultAsync(e => e.UserId == user.Id);
            if (employee == null) return Unauthorized();
            return Ok(new { name = employee.Name });
        }


        // Existing methods for Jobs/Candidates kept as is or moved to another service?
        // Requirement only asked for Referral Service. I will keep existing job/candidate search for UI support.

        [HttpGet("jobs")]
        public async Task<IActionResult> GetCompanyJobs()
        {
            var email = User.Identity.Name;
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null) return Unauthorized();
            var employee = await _context.Employees.FirstOrDefaultAsync(e => e.UserId == user.Id);
            if (employee == null) return Unauthorized();

            var jobs = await _context.Jobs
                .Where(j => j.CompanyId == employee.CompanyId && j.Status == "OPEN")
                .ToListAsync();
            return Ok(jobs);
        }

        [HttpGet("candidates")]
        public async Task<IActionResult> SearchCandidates([FromQuery] string name)
        {
            if (string.IsNullOrEmpty(name)) return Ok(new List<Candidate>());
            
            var candidates = await _context.Candidates
                .Where(c => c.Name.Contains(name))
                .ToListAsync();
            return Ok(candidates);
        }

        [Authorize(Roles = "EMPLOYEE")]
        [HttpPost("refer")]
        public async Task<IActionResult> ReferCandidate([FromBody] ReferralRequestDto request)
        {
            try
            {
                var email = User.Identity.Name;
                var result = await _referralService.ReferCandidateAsync(request, email);
                return Ok(result);
            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized();
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("employee/my-referrals")]
        public async Task<IActionResult> GetMyReferrals()
        {
            try
            {
                var email = User.Identity.Name;
                var referrals = await _referralService.GetEmployeeReferralsAsync(email);
                return Ok(referrals);
            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized();
            }
        }

        [HttpGet("company/{companyId}")]
        public async Task<IActionResult> GetCompanyReferrals(long companyId)
        {
            // ideally check if current user is admin for that company
            var referrals = await _referralService.GetCompanyReferralsAsync(companyId);
            return Ok(referrals);
        }

        [HttpGet("employees/{employeeId}/referrals")]
        public async Task<IActionResult> GetEmployeeReferralsById(long employeeId)
        {
             // This endpoint matches the requirement: "Company Dashboard... see list of candidates referred by that employee"
             var referrals = await _referralService.GetReferralsByEmployeeIdAsync(employeeId);
             return Ok(referrals);
        }
        
        
        [HttpGet("job/{jobId}")]
        public async Task<IActionResult> GetJobReferrals(long jobId)
        {
            var referrals = await _referralService.GetJobReferralsAsync(jobId);
            return Ok(referrals);
        }

        // ===================== NEW: JOB DETAILS FOR EMPLOYEES =====================
        
        [HttpGet("jobs/{jobId}/details")]
        public async Task<IActionResult> GetJobDetails(long jobId)
        {
            try
            {
                var email = User.Identity.Name;
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
                if (user == null) return Unauthorized();
                
                var employee = await _context.Employees.FirstOrDefaultAsync(e => e.UserId == user.Id);
                if (employee == null) return Unauthorized("Only employees can access this endpoint");

                var job = await _context.Jobs.FirstOrDefaultAsync(j => j.Id == jobId);
                if (job == null) return NotFound("Job not found");

                // Verify employee belongs to the company that owns this job
                if (job.CompanyId != employee.CompanyId)
                {
                    return Forbid("You can only view jobs from your company");
                }

                var jobDetails = new Dtos.JobDetailsDto
                {
                    Id = job.Id,
                    Title = job.Title,
                    Description = job.Description,
                    RequiredSkills = job.RequiredSkills ?? "",
                    Status = job.Status,
                    CompanyId = job.CompanyId
                };

                return Ok(jobDetails);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // ===================== NEW: JOB APPLICANTS FOR EMPLOYEES =====================
        
        [HttpGet("jobs/{jobId}/applicants")]
        public async Task<IActionResult> GetJobApplicants(long jobId)
        {
            try
            {
                var email = User.Identity.Name;
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
                if (user == null) return Unauthorized();
                
                var employee = await _context.Employees.FirstOrDefaultAsync(e => e.UserId == user.Id);
                if (employee == null) return Unauthorized("Only employees can access this endpoint");

                var job = await _context.Jobs.FirstOrDefaultAsync(j => j.Id == jobId);
                if (job == null) return NotFound("Job not found");

                // Verify employee belongs to the company that owns this job
                if (job.CompanyId != employee.CompanyId)
                {
                    return Forbid("You can only view applicants for your company's jobs");
                }

                // Query applications directly from database
                var applications = await _context.Set<Models.JobApplication>()
                    .Include(a => a.Candidate)
                        .ThenInclude(c => c.User)
                    .Where(a => a.JobId == jobId)
                    .ToListAsync();

                // Map to DTOs with referral information
                var applicantDtos = new List<Dtos.ApplicantDto>();
                
                foreach (var app in applications)
                {
                    // Check if this candidate was referred
                    var referral = await _context.Referrals
                        .Include(r => r.Employee)
                        .FirstOrDefaultAsync(r => r.JobId == jobId && r.CandidateId == app.CandidateId);

                    var dto = new Dtos.ApplicantDto
                    {
                        Id = app.Id,
                        CandidateId = app.CandidateId,
                        CandidateName = app.Candidate?.Name ?? "Unknown",
                        Email = app.Candidate?.User?.Email ?? app.Candidate?.Name ?? "Unknown",
                        Skills = app.Candidate?.Skills ?? "",
                        Status = app.Status,
                        ReferredByEmployeeId = referral?.EmployeeId,
                        ReferredByEmployeeName = referral?.Employee?.Name
                    };
                    
                    applicantDtos.Add(dto);
                }

                return Ok(applicantDtos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }
    }
}
