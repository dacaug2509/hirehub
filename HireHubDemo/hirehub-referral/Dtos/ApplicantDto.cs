namespace HireHub.Referral.Dtos
{
    public class ApplicantDto
    {
        public long Id { get; set; }
        public long CandidateId { get; set; }
        public string CandidateName { get; set; }
        public string Email { get; set; }
        public string Skills { get; set; }
        public string Status { get; set; }
        
        // Referral tracking
        public long? ReferredByEmployeeId { get; set; }
        public string ReferredByEmployeeName { get; set; }
    }
}
