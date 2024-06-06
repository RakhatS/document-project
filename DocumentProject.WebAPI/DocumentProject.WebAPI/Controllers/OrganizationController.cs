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
                Type = OrganizationType.Company.ToString(),
                Address = newOrganizationReq.Address,
                BIN = newOrganizationReq.BIN,
                ContactNumber = newOrganizationReq.ContactNumber
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




        [Authorize(Roles = "Manager")]
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














        [Authorize(Roles = "Admin")]
        [HttpDelete("DeleteById")]
        public async Task DeleteOrganizationById([FromQuery] Guid organizationid)
        {
            var organization = await _dbContext.Organizations
                  .Include(x => x.Members)
                  .SingleOrDefaultAsync(x => x.Id == organizationid);

            if (organization == null)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync("Organization not found");
                return;
            }

            _dbContext.Organizations.Remove(organization);
            await _dbContext.SaveChangesAsync();
            return;
        }



        [Authorize(Roles = "Admin")]
        [HttpGet("OrganizationsList")]
        public async Task<List<OrganizationDTO>> GetOrganizationsList()
        {
            var organizations = await _dbContext.Organizations
                .Include(x => x.OwnerManager)
                .ToListAsync();


            return Mapper.Map<List<OrganizationDTO>>(organizations);
        }



        [Authorize(Roles = "Admin")]
        [HttpPost("CreateForMember")]
        public async Task<OrganizationDTO?> CreateOrganizationForMember([FromBody] OrganizationDTO newOrganizationReq)
        {
            var manager = await _dbContext.Managers.SingleOrDefaultAsync(x => x.Id == newOrganizationReq.OwnerManagerId);

            if (manager == null)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync("Manager not found");
                return null;
            }

            var newOrganization = new Organization
            {
                Name = newOrganizationReq.Name,
                OwnerManagerId = manager.Id,
                Type = OrganizationType.Company.ToString(),
                Address = newOrganizationReq.Address,
                BIN = newOrganizationReq.BIN,
                ContactNumber = newOrganizationReq.ContactNumber
            };

            await _dbContext.Organizations.AddAsync(newOrganization);
            await _dbContext.SaveChangesAsync();

            newOrganizationReq.Id = newOrganization.Id;
            newOrganizationReq.DateCreated = newOrganization.DateCreated;

            return newOrganizationReq;
        }

























        [Authorize(Roles = "Manager")]
        [HttpPost("Update")]
        public async Task<OrganizationDTO?> UpdateOrganization([FromBody] OrganizationDTO updatedOrganizationReq)
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

            var organization = manager.Organizations.SingleOrDefault(x => x.Id == updatedOrganizationReq.Id);

            if (organization == null)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync("Organization not found");
                return null;
            }


            organization.BIN = updatedOrganizationReq.BIN;
            organization.Address = updatedOrganizationReq.Address;
            organization.ContactNumber = updatedOrganizationReq.ContactNumber;
            organization.Name = updatedOrganizationReq.Name;
           
            await _dbContext.SaveChangesAsync();

            updatedOrganizationReq.DateCreated = updatedOrganizationReq.DateCreated;

            return updatedOrganizationReq;
        }






        [Authorize(Roles = "Admin")]
        [HttpPost("UpdateByAdmin")]
        public async Task<OrganizationDTO?> UpdateOrganizationByAdmin([FromBody] OrganizationDTO updatedOrganizationReq)
        {


            var organization = await _dbContext.Organizations.SingleOrDefaultAsync(x => x.Id == updatedOrganizationReq.Id);

            if (organization == null)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync("Organization not found");
                return null;
            }


            organization.BIN = updatedOrganizationReq.BIN;
            organization.Address = updatedOrganizationReq.Address;
            organization.ContactNumber = updatedOrganizationReq.ContactNumber;
            organization.Name = updatedOrganizationReq.Name;
            organization.OwnerManagerId = updatedOrganizationReq.OwnerManagerId;

            await _dbContext.SaveChangesAsync();

            updatedOrganizationReq.DateCreated = updatedOrganizationReq.DateCreated;

            return updatedOrganizationReq;
        }


        [Authorize(Roles = "Admin")]
        [HttpDelete("ForceDelete")]
        public async Task ForceDeleteOrganization([FromQuery] Guid organizationId)
        {

            var organization = await _dbContext.Organizations
                .Include(x => x.Members)
                .Include(x => x.Applications)
                .SingleOrDefaultAsync(x => x.Id == organizationId);
            if (organization == null)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync("Organization not found");
                return;
            }
            _dbContext.Organizations.Remove(organization);
            await _dbContext.SaveChangesAsync();
        }
    }
}
