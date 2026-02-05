using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HireHub.Referral.Models
{
    [Table("jobs")]
    public class Job
    {
        [Key]
        public long Id { get; set; }

        [Column("company_id")]
        public long CompanyId { get; set; }

        public string Title { get; set; }
        public string Description { get; set; }
        public string Status { get; set; } // OPEN, CLOSED
    }
}
