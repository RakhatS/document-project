using DocumentProject.WebAPI.DTO.Abstract;

namespace DocumentProject.WebAPI.DTO
{
    public class ApplicationDTO : BaseDTO
    {
        public string Number { get; set; }
        public string Name { get; set; }
        public string? Status { get; set; }
        public string Type { get; set; }
        public DateTime? SignatureDate { get; set; }
        public Guid MemberId { get; set; }
        public MemberDTO? Member { get; set; }
        public Guid OrganizationId { get; set; }
        public OrganizationDTO? Organization { get; set; }
    }
}
