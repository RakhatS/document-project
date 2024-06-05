using DocumentProject.WebAPI.Data.Abstract;

namespace DocumentProject.WebAPI.Data
{
    public class Notification: Entity
    {
        public string Message { get; set; }
        public bool IsMarkedAsRead { get; set; } = false;

        public Guid? ForManagerId { get; set; }
        public Guid? ForMemberId { get; set; }
    }
}
