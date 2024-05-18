using DocumentProject.WebAPI.Data;
using DocumentProject.WebAPI.Data.Enums;
using DocumentProject.WebAPI.DTO;
using DocumentProject.WebAPI.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace DocumentProject.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MemberController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly ApplicationDbContext _dbContext;


        public MemberController(ApplicationDbContext dbContext,
                                  UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
            _dbContext = dbContext;
        }



        [Authorize(Roles = "Manager")]
        [HttpPost("CreateOrganizationMember")]
        public async Task<MemberDTO?> CreateOrganizationMember([FromBody] MemberDTO newMemberReq)
        {
            if (string.IsNullOrEmpty(newMemberReq.Email))
            {
                Response.StatusCode = 400;
                await Response.WriteAsync("Email must not be null or empty");
                return null;
            }
            newMemberReq.Email = newMemberReq.Email.ToLower().Trim();


            var manager = await _dbContext.Managers.SingleOrDefaultAsync(x => x.IdentityUser.UserName == User.ToUserInfo().UserName);

            if (manager == null)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync("Manager not found");
                return null;
            }

            var organization = await _dbContext.Organizations.SingleOrDefaultAsync(x => x.Id == newMemberReq.OrganizationId);

            if (organization == null)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync("Organization not found");
                return null;
            }

            if(organization.OwnerManagerId != manager.Id)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync("You cannot create a member for this organization");
                return null;
            }


            var user = new IdentityUser();
            user.Email = newMemberReq.Email;
            user.UserName = newMemberReq.Email;
            await _userManager.CreateAsync(user, newMemberReq.Password);


            await _userManager.AddToRoleAsync(user, UserRole.Member.ToString());
            var newMember = new Member();
            newMember.IdentityUser = user;
            newMember.FirstName = newMemberReq.FirstName;
            newMember.LastName = newMemberReq.LastName;
            newMember.OrganizationId = organization.Id;

            await _dbContext.Members.AddAsync(newMember);
            await _dbContext.SaveChangesAsync(default);

            return newMemberReq;
        }
    }
}
