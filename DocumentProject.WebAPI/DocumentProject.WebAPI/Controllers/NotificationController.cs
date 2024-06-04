using AutoMapper;
using DocumentProject.WebAPI.Abstract;
using DocumentProject.WebAPI.Data;
using DocumentProject.WebAPI.DTO;
using DocumentProject.WebAPI.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DocumentProject.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IFilesDestination _filesDestination;

        public NotificationController(ApplicationDbContext dbContext,
         IFilesDestination filesDestination)
        {
            _dbContext = dbContext;
            _filesDestination = filesDestination;
        }



        [Authorize(Roles = "Member")]
        [HttpGet("MemberNotifications")]
        public async Task<List<NotificationDTO>?> GetMemberNotifications()
        {
            var member = await _dbContext.Members
                .Include(x => x.Notifications)
                .SingleOrDefaultAsync(x => x.IdentityUser.UserName == User.ToUserInfo().UserName);

            if (member == null)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync("Member not found");
                return null;
            }

            return Mapper.Map<List<Notification>, List<NotificationDTO>>(member.Notifications);
        }








        [Authorize(Roles = "Manager")]
        [HttpGet("ManagerNotifications")]
        public async Task<List<NotificationDTO>?> GetManagerNotifications()
        {
            var manager = await _dbContext.Managers
                .Include(x => x.Notifications)
                .SingleOrDefaultAsync(x => x.IdentityUser.UserName == User.ToUserInfo().UserName);

            if (manager == null)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync("Manager not found");
                return null;
            }

            return Mapper.Map<List<Notification>, List<NotificationDTO>>(manager.Notifications);
        }





        [Authorize(Roles = "Member")]
        [HttpGet("MarkMemberNotificationAsRead")]
        public async Task MarkMemberNotificationAsRead([FromQuery] Guid notificationId)
        {
            var member = await _dbContext.Members
                .Include(x => x.Notifications)
                .SingleOrDefaultAsync(x => x.IdentityUser.UserName == User.ToUserInfo().UserName);

            if (member == null)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync("Member not found");
                return;
            }

            var notification = member.Notifications.SingleOrDefault(x => x.Id == notificationId);

            if (notification == null)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync("Notification not found");
                return;
            }

            notification.IsMarkedAsRead = true;

            await _dbContext.SaveChangesAsync();
        }










        [Authorize(Roles = "Manager")]
        [HttpGet("MarkManagerNotificationAsRead")]
        public async Task MarkManagerNotificationAsRead([FromQuery] Guid notificationId)
        {
            var manager = await _dbContext.Managers
                .Include(x => x.Notifications)
                .SingleOrDefaultAsync(x => x.IdentityUser.UserName == User.ToUserInfo().UserName);

            if (manager == null)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync("Manager not found");
                return;
            }

            var notification = manager.Notifications.SingleOrDefault(x => x.Id == notificationId);

            if (notification == null)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync("Notification not found");
                return;
            }

            notification.IsMarkedAsRead = true;

            await _dbContext.SaveChangesAsync();
        }
    }
}
