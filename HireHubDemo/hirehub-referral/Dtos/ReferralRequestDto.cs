using System.ComponentModel.DataAnnotations;

namespace HireHub.Referral.Dtos
{
    public class ReferralRequestDto
    {
        [Required]
        public long JobId { get; set; }

        [Required]
        public long CandidateId { get; set; }
    }
}
