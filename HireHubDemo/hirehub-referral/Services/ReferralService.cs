using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using HireHub.Referral.Data;
using HireHub.Referral.Dtos;
using HireHub.Referral.Models;
using HireHub.Referral.Repositories;

namespace HireHub.Referral.Services
{
    public class ReferralService : IReferralService
    {
        private readonly IReferralRepository _repository;
        private readonly AppDbContext _context;

        public ReferralService(IReferralRepository repository, AppDbContext context)
        {
            _repository = repository;
            _context = context;
        }

        private async Task<Employee> GetEmployeeByEmailAsync(string email)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null) return null;
            return await _context.Employees.FirstOrDefaultAsync(e => e.UserId == user.Id);
        }

        public async Task<ReferralResponseDto> ReferCandidateAsync(
    ReferralRequestDto request,
    string userEmail)
        {
            var employee = await GetEmployeeByEmailAsync(userEmail);
            if (employee == null)
                throw new UnauthorizedAccessException("Employee not found");

            // Validate job and ownership
            var job = await _context.Jobs.FindAsync(request.JobId);
            if (job == null || job.CompanyId != employee.CompanyId)
                throw new InvalidOperationException("Invalid job");

            // Validate candidate
            var candidate = await _context.Candidates.FindAsync(request.CandidateId);
            if (candidate == null)
                throw new InvalidOperationException("Candidate not found");

            // Check if candidate has applied to this job
            var hasApplied = await _context.Set<JobApplication>()
                .AnyAsync(a => a.JobId == request.JobId && a.CandidateId == request.CandidateId);
            
            if (!hasApplied)
                throw new InvalidOperationException("Candidate has not applied to this job yet. They must apply first before being referred.");

            // Prevent duplicate referral
            var existingReferral = await _context.Referrals
                .Include(r => r.Employee)
                .FirstOrDefaultAsync(r => r.JobId == request.JobId && r.CandidateId == request.CandidateId);
            
            if (existingReferral != null)
            {
                var referrerName = existingReferral.Employee?.Name ?? "Another employee";
                throw new InvalidOperationException($"This candidate was already referred by {referrerName}");
            }

            var referral = new ReferralEntity
            {
                JobId = request.JobId,
                CandidateId = request.CandidateId,
                EmployeeId = employee.Id,
                ReferralDate = DateTime.UtcNow,
                Status = ReferralStatus.PENDING
            };

            var created = await _repository.CreateAsync(referral);

            return new ReferralResponseDto
            {
                Id = created.Id,
                JobId = created.JobId,
                CandidateId = created.CandidateId,
                JobTitle = job.Title,
                CandidateName = candidate.Name,
                ReferrerName = employee.Name,
                ReferralDate = created.ReferralDate,
                Status = created.Status.ToString()
            };
        }


        public async Task<List<ReferralResponseDto>> GetEmployeeReferralsAsync(string userEmail)
        {
            var employee = await GetEmployeeByEmailAsync(userEmail);
            if (employee == null) throw new UnauthorizedAccessException("Employee not found");

            var referrals = await _repository.GetByEmployeeIdAsync(employee.Id);
            return referrals.Select(MapToDto).ToList();
        }

        public async Task<List<ReferralResponseDto>> GetReferralsByEmployeeIdAsync(long employeeId)
        {
            var referrals = await _repository.GetByEmployeeIdAsync(employeeId);
            return referrals.Select(MapToDto).ToList();
        }

        public async Task<List<ReferralResponseDto>> GetCompanyReferralsAsync(long companyId)
        {
             var referrals = await _repository.GetByCompanyIdAsync(companyId);
             return referrals.Select(MapToDto).ToList();
        }

        public async Task<List<ReferralResponseDto>> GetJobReferralsAsync(long jobId)
        {
             var referrals = await _repository.GetByJobIdAsync(jobId);
             return referrals.Select(MapToDto).ToList();
        }

        private ReferralResponseDto MapToDto(ReferralEntity entity)
        {
            return new ReferralResponseDto
            {
                Id = entity.Id,
                JobId = entity.JobId,
                CandidateId = entity.CandidateId,
                JobTitle = entity.Job?.Title,
                CandidateName = entity.Candidate?.Name,
                ReferrerName = entity.Employee?.Name,
                ReferralDate = entity.ReferralDate,
                Status = entity.Status.ToString()
            };
        }

    }
}
