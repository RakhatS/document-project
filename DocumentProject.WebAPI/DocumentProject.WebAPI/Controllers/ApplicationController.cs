﻿using AutoMapper;
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
                  .Include(x => x.OwnerManager)
                  .SingleOrDefaultAsync(x => x.Id == newApplicationReq.OrganizationId);

            if (organization == null)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync("Organization not found");
                return null;
            }

            if (organization.Id != member.OrganizationId)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync("You cannot create an application for this organization");
                return null;
            }


            var newApplication = new Application
            {
                Name = newApplicationReq.Name,
                Status = ApplicationStatus.Awaiting.ToString(),
                MemberId = member.Id,
                OrganizationId = organization.Id,
                Text = await ExtensionMethods.GetApplicationText(newApplicationReq.Name, member, organization)
            };

            Random random = new Random();

            do
            {
                newApplication.Number = random.Next(100000, 1000000).ToString();
            } while (await _dbContext.Applications.AnyAsync(x => x.Number == newApplication.Number));


            await _dbContext.Applications.AddAsync(newApplication);


            await _dbContext.Notifications.AddAsync(new Notification
            {
                Message = $"New application by {member.FirstName + member.LastName}[{newApplication.Number}].",
                ForManagerId = organization.OwnerManagerId,
                IsMarkedAsRead = false
            });


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
        public async Task<List<ApplicationDTO>?> GetOrganizationApplications([FromQuery] Guid organizationId)
        {
            var organization = await _dbContext.Organizations
                    .Include(x => x.Applications).ThenInclude(x => x.Member)
                    .SingleOrDefaultAsync(x => x.Id == organizationId);

            if (organization == null)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync("Organization not found");
                return null;
            }

            return Mapper.Map<List<Application>, List<ApplicationDTO>>(organization.Applications);
        }




        [Authorize(Roles = "Member")]
        [HttpDelete("Delete")]
        public async Task DeleteApplication([FromQuery] Guid applicationId)
        {
            var member = await _dbContext.Members.SingleOrDefaultAsync(x => x.IdentityUser.UserName == User.ToUserInfo().UserName);

            if (member == null)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync("Member not found");
                return;
            }

            var application = await _dbContext.Applications
                .SingleOrDefaultAsync(x => x.Id == applicationId);

            if (application == null)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync("Application not found");
                return;
            }

            if (application.MemberId != member.Id)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync("You cannot delete this application");
                return;
            }

            _dbContext.Applications.Remove(application);
            await _dbContext.SaveChangesAsync();

        }




        [Authorize(Roles = "Manager")]
        [HttpPut("ChangeStatus")]
        public async Task<ApplicationDTO?> ChangeApplicationStatus([FromQuery] Guid applicationId, [FromQuery] string newStatus)
        {
            if (newStatus != ApplicationStatus.Signed.ToString() && newStatus != ApplicationStatus.Unsigned.ToString())
            {
                Response.StatusCode = 400;
                await Response.WriteAsync("Invalid status");
                return null;
            }

            var manager = await _dbContext.Managers.SingleOrDefaultAsync(x => x.IdentityUser.UserName == User.ToUserInfo().UserName);

            if (manager == null)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync("Manager not found");
                return null;
            }

            var application = await _dbContext.Applications
                .Include(x => x.Organization)
                .SingleOrDefaultAsync(x => x.Id == applicationId);

            if (application == null)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync("Application not found");
                return null;
            }

            if (application.Organization.OwnerManagerId != manager.Id)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync("You cannot change this application's status");
                return null;
            }

            if (application.Status != ApplicationStatus.Awaiting.ToString())
            {
                Response.StatusCode = 400;
                await Response.WriteAsync($"This application has already been {application.Status.ToLower()}");
                return null;
            }


            application.Status = newStatus;

            if (application.Status == ApplicationStatus.Signed.ToString())
            {
                application.SignatureDate = DateTime.Now;
            }

            await _dbContext.Notifications.AddAsync(new Notification
            {
                Message = $"Apllication[{application.Number}] has been {application.Status.ToLower()}",
                ForMemberId = application.MemberId,
                IsMarkedAsRead = false
            });


            await _dbContext.SaveChangesAsync();

            return Mapper.Map<Application, ApplicationDTO>(application);
        }





        [Authorize]
        [HttpGet("ApplicationDocument")]
        public async Task<ApplicationDocumentDTO> GetApplicationDocument([FromQuery] Guid applicationId)
        {

            var application = await _dbContext.Applications
                .Include(x => x.Organization).ThenInclude(x => x.OwnerManager)
                .Include(x => x.Member)
                .SingleOrDefaultAsync(x => x.Id == applicationId);

            if (application == null)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync("Application not found");
                return new ApplicationDocumentDTO();
            }

            return new ApplicationDocumentDTO { Content = await ExtensionMethods.GetApplicationDocument(application) };
        }




        [Authorize(Roles = "Admin")]
        [HttpGet("ApplicationsList")]
        public async Task<List<ApplicationDTO>> GetApplicationsList()
        {

            var applications = await _dbContext.Applications
                .Include(x => x.Organization)
                .Include(x => x.Member)
                .ToListAsync();


            return Mapper.Map<List<Application>, List<ApplicationDTO>>(applications);
        }


















        [Authorize(Roles = "Admin")]
        [HttpDelete("ForceDelete")]
        public async Task ForceDeleteApplication([FromQuery] Guid applicationId)
        {

            var application = await _dbContext.Applications
                .SingleOrDefaultAsync(x => x.Id == applicationId);
            if (application == null)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync("Application not found");
                return;
            }
            _dbContext.Applications.Remove(application);
            await _dbContext.SaveChangesAsync();
        }


    }
}
