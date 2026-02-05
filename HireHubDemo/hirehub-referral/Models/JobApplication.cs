using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HireHub.Referral.Models
{
    [Table("applications")]
    public class JobApplication
    {
        [Key]
        public long Id { get; set; }

        [Column("job_id")]
        public long JobId { get; set; }

        [Column("candidate_id")]
        public long CandidateId { get; set; }

        [Column("status")]
        public string Status { get; set; }

        [Column("applied_at")]
        public DateTime AppliedAt { get; set; }

        // Navigation properties
        public Candidate Candidate { get; set; }
        public Job Job { get; set; }
    }
}
