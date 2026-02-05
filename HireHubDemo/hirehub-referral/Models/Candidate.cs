using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HireHub.Referral.Models
{
    [Table("candidates")]
    public class Candidate
    {
        [Key]
        public long Id { get; set; }
        
        [Column("user_id")]
        public long UserId { get; set; }

        public string Name { get; set; }
        public string Skills { get; set; }
        
        // Navigation property
        public User User { get; set; }
    }
}
