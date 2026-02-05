using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HireHub.Referral.Models
{
    [Table("employees")]
    public class Employee
    {
        [Key]
        public long Id { get; set; }

        [Column("user_id")]
        public long UserId { get; set; }

        [Column("company_id")]
        public long CompanyId { get; set; }

        public string Name { get; set; }
    }
}
