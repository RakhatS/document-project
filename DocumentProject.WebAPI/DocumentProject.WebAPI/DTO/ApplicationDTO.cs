using DocumentProject.WebAPI.DTO.Abstract;

namespace DocumentProject.WebAPI.DTO
{
    public class ApplicationDTO : BaseDTO
    {
        public string Status { get; set; }

        public Guid MemberId { get; set; }
        public Guid OrganizationId { get; set; }
    }
}
