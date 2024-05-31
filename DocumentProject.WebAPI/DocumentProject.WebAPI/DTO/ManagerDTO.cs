using DocumentProject.WebAPI.DTO.Abstract;

namespace DocumentProject.WebAPI.DTO
{
    public class ManagerDTO : BaseDTO
    {
        public string? Email { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? PhoneNumber { get; set; }
        public byte[]? PhotoBase64 { get; set; }
    }
}
