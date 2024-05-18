using DocumentProject.WebAPI.DTO.Abstract;

namespace DocumentProject.WebAPI.DTO
{
    public class MemberDTO : BaseDTO
    {
        public string? Email { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }


        public Guid OrganizationId { get; set; }

        public string? Password { get; set; }
    }
}
