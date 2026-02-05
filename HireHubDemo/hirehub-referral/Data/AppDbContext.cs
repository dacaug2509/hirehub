using Microsoft.EntityFrameworkCore;
using HireHub.Referral.Models;

namespace HireHub.Referral.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Job> Jobs { get; set; }
        public DbSet<Candidate> Candidates { get; set; }
        public DbSet<ReferralEntity> Referrals { get; set; }
        public DbSet<JobApplication> JobApplications { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Read-only entities or shared configurations
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ReferralEntity>()
                .HasIndex(r => new { r.JobId, r.CandidateId })
                .IsUnique();
        }
    }
}
