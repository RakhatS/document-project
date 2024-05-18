using AutoMapper;
using DocumentProject.WebAPI.Data;
using DocumentProject.WebAPI.Data.Enums;
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
    public class ApplicationController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;


        public ApplicationController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }


        [Authorize(Roles = "Member")]
        [HttpPost("Create")]
        public async Task<ApplicationDTO?> CreateApplication([FromBody] ApplicationDTO newApplicationReq)
        {
            var member = await _dbContext.Members.SingleOrDefaultAsync(x => x.IdentityUser.UserName == User.ToUserInfo().UserName);

            if (member == null)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync("Member not found");
                return null;
            }


            var organization = await _dbContext.Organizations
                  .Include(x => x.Members)
                  .SingleOrDefaultAsync(x => x.Id == newApplicationReq.OrganizationId);

            if (organization == null)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync("Organization not found");
                return null;
            }

            if(organization.Id != member.OrganizationId)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync("You cannot create an application for this organization");
                return null;
            }


            var newApplication = new Application
            {
               Status = ApplicationStatus.Awaiting.ToString(),
               MemberId = member.Id,
               OrganizationId = organization.Id,
            };

            await _dbContext.Applications.AddAsync(newApplication);
            await _dbContext.SaveChangesAsync();

            newApplicationReq.Id = newApplication.Id;
            newApplicationReq.DateCreated = newApplication.DateCreated;

            return newApplicationReq;
        }




        [Authorize(Roles = "Member")]
        [HttpGet("MemberApplications")]
        public async Task<List<ApplicationDTO>?> GetMemberApplications()
        {
            var member = await _dbContext.Members
                .Include(x => x.Applications)
                .SingleOrDefaultAsync(x => x.IdentityUser.UserName == User.ToUserInfo().UserName);

            if (member == null)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync("Member not found");
                return null;
            }

            return Mapper.Map<List<Application>, List<ApplicationDTO>>(member.Applications);
        }





        [Authorize]
        [HttpGet("OrganizationApplications")]
        public async Task<List<ApplicationDTO>?> GetOrganizationApplications(Guid organizationid)
        {
            var organization = await _dbContext.Organizations
                    .Include(x => x.Applications)
                    .SingleOrDefaultAsync(x => x.Id == organizationid);

            if (organization == null)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync("Organization not found");
                return null;
            }

            return Mapper.Map<List<Application>, List<ApplicationDTO>>(organization.Applications);
        }
    }
}
