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
    public class OrganizationController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;


        public OrganizationController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }





        [Authorize(Roles = "Manager")]
        [HttpPost("Create")]
        public async Task<OrganizationDTO?> CreateOrganization([FromBody] OrganizationDTO newOrganizationReq)
        {
            var manager = await _dbContext.Managers.SingleOrDefaultAsync(x => x.IdentityUser.UserName == User.ToUserInfo().UserName);

            if(manager == null)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync("Manager not found");
                return null;
            }

            var newOrganization = new Organization
            {
                Name = newOrganizationReq.Name,
                OwnerManagerId = manager.Id,
                Type = OrganizationType.Company.ToString()
            };

            await _dbContext.Organizations.AddAsync(newOrganization);
            await _dbContext.SaveChangesAsync();

            newOrganizationReq.Id = newOrganization.Id;
            newOrganizationReq.DateCreated = newOrganization.DateCreated;

            return newOrganizationReq;
        }








        [Authorize]
        [HttpGet("GetById")]
        public async Task<OrganizationDTO?> GetOrganizationById([FromQuery] Guid organizationid)
        {
            var organization = await _dbContext.Organizations
                  .Include(x => x.Members)
                  .SingleOrDefaultAsync(x => x.Id == organizationid);

            if (organization == null)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync("Organization not found");
                return null;
            }

            return Mapper.Map<Organization, OrganizationDTO>(organization);
        }




        [Authorize]
        [HttpGet("ManagerOrganizations")]
        public async Task<List<OrganizationDTO>?> GetManagerOrganizations()
        {
            var manager = await _dbContext.Managers
                .Include(x => x.Organizations)
                .SingleOrDefaultAsync(x => x.IdentityUser.UserName == User.ToUserInfo().UserName);

            if (manager == null)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync("Manager not found");
                return null;
            }

            return Mapper.Map<List<Organization>, List<OrganizationDTO>>(manager.Organizations);
        }
    }
}
