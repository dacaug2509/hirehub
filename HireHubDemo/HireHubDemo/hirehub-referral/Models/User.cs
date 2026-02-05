using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HireHub.Referral.Models
{
    [Table("users")]
    public class User
    {
        [Key]
        public long Id { get; set; }
        
        [Required]
        public string Email { get; set; }
        
        [Required]
        public string Password { get; set; }
        
        [Required]
        [Column(TypeName = "enum('ADMIN','COMPANY','CANDIDATE','EMPLOYEE')")]
        public string Role { get; set; }

        public bool IsActive { get; set; }
    }
}
