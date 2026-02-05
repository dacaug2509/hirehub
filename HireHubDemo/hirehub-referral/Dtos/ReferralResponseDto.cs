using System;

namespace HireHub.Referral.Dtos
{
    public class ReferralResponseDto
    {
        public long Id { get; set; }

        public long JobId { get; set; }
        public long CandidateId { get; set; }

        public string JobTitle { get; set; }
        public string CandidateName { get; set; }
        public string ReferrerName { get; set; }

        public DateTime ReferralDate { get; set; }
        public string Status { get; set; }
    }
}
