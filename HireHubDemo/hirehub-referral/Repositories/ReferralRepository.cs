using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using HireHub.Referral.Data;
using HireHub.Referral.Models;

namespace HireHub.Referral.Repositories
{
    public class ReferralRepository : IReferralRepository
    {
        private readonly AppDbContext _context;

        public ReferralRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<ReferralEntity> CreateAsync(ReferralEntity referral)
        {
            _context.Referrals.Add(referral);
            await _context.SaveChangesAsync();
            return referral;
        }

        public async Task<List<ReferralEntity>> GetByEmployeeIdAsync(long employeeId)
        {
            return await _context.Referrals
                .Include(r => r.Job)
                .Include(r => r.Candidate)
                .Include(r => r.Employee)
                .Where(r => r.EmployeeId == employeeId)
                .ToListAsync();
        }

        // Company is derived via Employee → Company
        public async Task<List<ReferralEntity>> GetByCompanyIdAsync(long companyId)
        {
            return await _context.Referrals
                .Include(r => r.Job)
                .Include(r => r.Candidate)
                .Include(r => r.Employee)
                .Where(r => r.Employee != null && r.Employee.CompanyId == companyId)
                .ToListAsync();
        }

        public async Task<List<ReferralEntity>> GetByJobIdAsync(long jobId)
        {
            return await _context.Referrals
                .Include(r => r.Job)
                .Include(r => r.Candidate)
                .Include(r => r.Employee)
                .Where(r => r.JobId == jobId)
                .ToListAsync();
        }

        public async Task<bool> ExistsAsync(long jobId, long candidateId)
        {
            return await _context.Referrals
                .AnyAsync(r => r.JobId == jobId && r.CandidateId == candidateId);
        }
    }
}
