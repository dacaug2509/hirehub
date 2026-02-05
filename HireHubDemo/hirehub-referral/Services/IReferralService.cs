using System.Collections.Generic;
using System.Threading.Tasks;
using HireHub.Referral.Dtos;

namespace HireHub.Referral.Services
{
    public interface IReferralService
    {
        Task<ReferralResponseDto> ReferCandidateAsync(ReferralRequestDto request, string userEmail);
        Task<List<ReferralResponseDto>> GetEmployeeReferralsAsync(string userEmail);
        Task<List<ReferralResponseDto>> GetReferralsByEmployeeIdAsync(long employeeId);
        Task<List<ReferralResponseDto>> GetCompanyReferralsAsync(long companyId);
        Task<List<ReferralResponseDto>> GetJobReferralsAsync(long jobId);
    }
}
