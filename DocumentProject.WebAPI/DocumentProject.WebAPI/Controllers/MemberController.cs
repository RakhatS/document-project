using AutoMapper;
using DocumentProject.WebAPI.Data;
using DocumentProject.WebAPI.Data.Enums;
using DocumentProject.WebAPI.DTO;
using DocumentProject.WebAPI.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Data;

namespace DocumentProject.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MemberController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly ApplicationDbContext _dbContext;
        private readonly RoleManager<IdentityRole> _roleManager;


        public MemberController(ApplicationDbContext dbContext,
                                  UserManager<IdentityUser> userManager,
                                  RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _dbContext = dbContext;
            _roleManager = roleManager;
        }

        [Authorize(Roles = "Member")]
        [HttpGet("Current")]
        public async Task<MemberDTO?> CurrentMember()
        {
            var member = await _dbContext.Members
               .SingleOrDefaultAsync(x => x.IdentityUser.Email == User.ToUserInfo().UserName
                            || x.IdentityUser.UserName == User.ToUserInfo().UserName);


            if (member == null)
                return null;
            

            return Mapper.Map<Member, MemberDTO>(member);
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


            var manager = await _dbContext.Managers
                .SingleOrDefaultAsync(x => x.IdentityUser.UserName == User.ToUserInfo().UserName);

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

            if (organization.OwnerManagerId != manager.Id)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync("You cannot create a member for this organization");
                return null;
            }
            await _roleManager.CreateAsync(new IdentityRole(UserRole.Member.ToString()));



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
            newMember.Address = newMemberReq.Address;
            newMember.Position = newMemberReq.Position;

            await _dbContext.Members.AddAsync(newMember);
            await _dbContext.SaveChangesAsync(default);

            return newMemberReq;
        }


        [Authorize]
        [HttpGet("OrganizationMembers")]
        public async Task<List<MemberDTO>?> GetOrganizationMembers(Guid organizationId)
        {

            var organization = await _dbContext.Organizations
                .Include(x => x.Members).ThenInclude(x => x.IdentityUser)
                .SingleOrDefaultAsync(x => x.Id == organizationId);

            if (organization == null)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync("Organization not found");
                return null;
            }

            return Mapper.Map<List<Member>, List<MemberDTO>>(organization.Members);
        }
    }
}
