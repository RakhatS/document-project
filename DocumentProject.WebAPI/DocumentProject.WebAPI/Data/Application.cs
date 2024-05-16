using DocumentProject.WebAPI.Data.Abstract;

namespace DocumentProject.WebAPI.Data
{
    public class Application: Entity
    {
        public string Status { get; set; }

        public Guid MemberId { get; set; }
        public Member Member { get; set; }

        public Guid OrganizationId { get; set; }
        public Organization Organization { get; set; }
    }
}
