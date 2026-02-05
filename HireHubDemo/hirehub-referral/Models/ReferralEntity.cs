using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HireHub.Referral.Models
{
    [Table("referrals")]
    public class ReferralEntity
    {
        [Key]
        public long Id { get; set; }

        [Required]
        [Column("job_id")]
        public long JobId { get; set; }

        [Required]
        [Column("candidate_id")]
        public long CandidateId { get; set; }

        [Required]
        [Column("employee_id")]
        public long EmployeeId { get; set; }

        [Required]
        [Column("referral_date")]
        public DateTime ReferralDate { get; set; }

        [Required]
        [Column("status")]
        public ReferralStatus Status { get; set; } = ReferralStatus.PENDING;

        // Navigation properties
        public Job Job { get; set; }
        public Candidate Candidate { get; set; }
        public Employee Employee { get; set; }
    }
}
