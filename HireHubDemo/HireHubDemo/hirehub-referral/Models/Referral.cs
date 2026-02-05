using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HireHub.Referral.Models
{
    [Table("referrals")]
    public class Referral
    {
        [Key]
        public long Id { get; set; }

        [Column("job_id")]
        public long JobId { get; set; }

        [Column("employee_id")]
        public long EmployeeId { get; set; }

        [Column("candidate_id")]
        public long CandidateId { get; set; }

        [Column("referral_date")]
        public DateTime ReferralDate { get; set; } = DateTime.UtcNow;
    }
}
