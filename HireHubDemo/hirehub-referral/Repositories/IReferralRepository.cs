using System.Collections.Generic;
using System.Threading.Tasks;
using HireHub.Referral.Models;

namespace HireHub.Referral.Repositories
{
    public interface IReferralRepository
    {
        Task<ReferralEntity> CreateAsync(ReferralEntity referral);
        Task<List<ReferralEntity>> GetByEmployeeIdAsync(long employeeId);
        Task<List<ReferralEntity>> GetByCompanyIdAsync(long companyId);
        Task<List<ReferralEntity>> GetByJobIdAsync(long jobId);
        Task<bool> ExistsAsync(long jobId, long candidateId);
    }
}
