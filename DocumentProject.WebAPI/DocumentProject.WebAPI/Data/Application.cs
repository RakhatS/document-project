using DocumentProject.WebAPI.Data.Abstract;

namespace DocumentProject.WebAPI.Data
{
    public class Application: Entity
    {
        public string Number { get; set; }
        public string Name { get; set; }
        public string Status { get; set; }
        public DateTime? SignatureDate { get; set; }
        public Guid MemberId { get; set; }
        public Member Member { get; set; }
        public Guid OrganizationId { get; set; }
        public Organization Organization { get; set; }
    }
}
