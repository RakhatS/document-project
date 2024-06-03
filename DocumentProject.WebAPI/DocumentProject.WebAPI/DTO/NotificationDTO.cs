using DocumentProject.WebAPI.DTO.Abstract;

namespace DocumentProject.WebAPI.DTO
{
    public class NotificationDTO: BaseDTO
    {
        public string Message { get; set; }
        public bool IsMarkedAsRead { get; set; }
        public Guid? ForManagerId { get; set; }
        public Guid? ForMemberId { get; set; }
    }
}
