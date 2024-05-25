using DocumentProject.WebAPI.Data.Abstract;
using Microsoft.AspNetCore.Identity;

namespace DocumentProject.WebAPI.Data
{
    public class Member: Entity
    {
        public IdentityUser IdentityUser { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string Address { get; set; }

        public Guid OrganizationId { get; set; }
        public Organization Organization { get; set; }
        public List<Application> Applications { get; set; }
    }
}
