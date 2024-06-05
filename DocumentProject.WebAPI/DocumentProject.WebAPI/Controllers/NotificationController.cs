using AutoMapper;
using DocumentProject.WebAPI.Abstract;
using DocumentProject.WebAPI.Data;
using DocumentProject.WebAPI.DTO;
using DocumentProject.WebAPI.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.Metrics;

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
                .SingleOrDefaultAsync(x => x.IdentityUser.UserName == User.ToUserInfo().UserName);

            if (member == null)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync("Member not found");
                return null;
            }


            var notifications = await _dbContext.Notifications.Where(x => x.ForMemberId == member.Id && x.IsMarkedAsRead == false).ToListAsync();

            return Mapper.Map<List<Notification>, List<NotificationDTO>>(notifications);
        }








        [Authorize(Roles = "Manager")]
        [HttpGet("ManagerNotifications")]
        public async Task<List<NotificationDTO>?> GetManagerNotifications()
        {
            var manager = await _dbContext.Managers
                .SingleOrDefaultAsync(x => x.IdentityUser.UserName == User.ToUserInfo().UserName);

            if (manager == null)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync("Manager not found");
                return null;
            }

            var notifications = await _dbContext.Notifications.Where(x => x.ForManagerId == manager.Id && x.IsMarkedAsRead == false).ToListAsync();

            return Mapper.Map<List<Notification>, List<NotificationDTO>>(notifications);
        }





        [Authorize(Roles = "Member")]
        [HttpPut("MarkMemberNotificationAsRead")]
        public async Task MarkMemberNotificationAsRead([FromQuery] Guid notificationId)
        {
            var member = await _dbContext.Members
                .SingleOrDefaultAsync(x => x.IdentityUser.UserName == User.ToUserInfo().UserName);

            if (member == null)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync("Member not found");
                return;
            }

            var notification = await _dbContext.Notifications.SingleOrDefaultAsync(x => x.Id == notificationId && x.ForMemberId == member.Id);

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
        [HttpPut("MarkManagerNotificationAsRead")]
        public async Task MarkManagerNotificationAsRead([FromQuery] Guid notificationId)
        {
            var manager = await _dbContext.Managers
                .SingleOrDefaultAsync(x => x.IdentityUser.UserName == User.ToUserInfo().UserName);

            if (manager == null)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync("Manager not found");
                return;
            }

            var notification = await _dbContext.Notifications.SingleOrDefaultAsync(x => x.Id == notificationId && x.ForManagerId == manager.Id);

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
