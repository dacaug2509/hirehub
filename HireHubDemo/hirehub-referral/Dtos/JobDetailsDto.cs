namespace HireHub.Referral.Dtos
{
    public class JobDetailsDto
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string RequiredSkills { get; set; }
        public string Status { get; set; }
        public long CompanyId { get; set; }
    }
}
