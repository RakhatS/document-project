﻿using AutoMapper;
using DocumentProject.WebAPI.Abstract;
using DocumentProject.WebAPI.Data;
using DocumentProject.WebAPI.DTO;
using DocumentProject.WebAPI.Helpers;
using DocumentProject.WebAPI.Views;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Asn1.Ocsp;

namespace DocumentProject.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ManagerController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IFilesDestination _filesDestination;
        private readonly UserManager<IdentityUser> _userManager;

        public ManagerController(ApplicationDbContext dbContext,
            IFilesDestination filesDestination, UserManager<IdentityUser> userManager)
        {
            _dbContext = dbContext;
            _filesDestination = filesDestination;
            _userManager = userManager;
        }


        [Authorize(Roles = "Manager")]
        [HttpGet("Current")]
        public async Task<ManagerDTO?> CurrentManager()
        {
            var manager = await _dbContext.Managers
               .Include(x => x.IdentityUser)
               .SingleOrDefaultAsync(x => x.IdentityUser.Email == User.ToUserInfo().UserName
                            || x.IdentityUser.UserName == User.ToUserInfo().UserName);


            if (manager == null)
                return null;

            return Mapper.Map<Manager, ManagerDTO>(manager);
        }



        [Authorize(Roles = "Manager")]
        [HttpPut("Update")]
        public async Task UpdateManager([FromBody] ManagerDTO updatedManager)
        {
            var manager = await _dbContext.Managers
               .SingleOrDefaultAsync(x => x.IdentityUser.Email == User.ToUserInfo().UserName
                            || x.IdentityUser.UserName == User.ToUserInfo().UserName);


            if (manager == null)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync("Manager not found");
                return;
            }

            manager.FirstName = updatedManager.FirstName;
            manager.LastName = updatedManager.LastName;
            manager.PhoneNumber = updatedManager.PhoneNumber;

            await _dbContext.SaveChangesAsync();

        }





        [HttpPost("UploadProfilePhoto")]
        [Authorize(Roles = "Manager")]
        public async Task UploadProfilePhoto([FromBody] PhotoModel photoModel)
        {
            var manager = await _dbContext.Managers
               .SingleOrDefaultAsync(x => x.IdentityUser.Email == User.ToUserInfo().UserName
                            || x.IdentityUser.UserName == User.ToUserInfo().UserName);


            if (manager == null)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync("Manager not found");
                return;
            }


            var imageDataStream = new MemoryStream(photoModel.PhotoBase64);
            imageDataStream.Position = 0;
            var fileName = $"manager_avatar_{manager.Id}.png";
            var path = Path.Combine(_filesDestination.UserPhotosDirectory, fileName);
            using (var stream = new FileStream(path, FileMode.Create))
            {
                await imageDataStream.CopyToAsync(stream);
            }
            manager.PhotoUrl = path;

            await _dbContext.SaveChangesAsync();

        }





        [Authorize(Roles = "Admin")]
        [HttpGet("ManagersList")]
        public async Task<List<ManagerDTO>> GetManagersList()
        {
            var managers = await _dbContext.Managers
                .Include(x => x.IdentityUser)
                .ToListAsync();


            return Mapper.Map<List<ManagerDTO>>(managers);
        }



        [Authorize(Roles = "Admin")]
        [HttpDelete("ForceDelete")]
        public async Task ForceDeleteManager([FromQuery] Guid managerId)
        {

            var manager = await _dbContext.Managers
                .Include(x => x.IdentityUser)
                .Include(x => x.Organizations)
                .SingleOrDefaultAsync(x => x.Id == managerId);
            if (manager == null)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync("Manager not found");
                return;
            }

            foreach(var organization in manager.Organizations)
            {
                organization.OwnerManager = null;
                organization.OwnerManagerId = null;
            }

            await _dbContext.SaveChangesAsync();

            manager.Organizations = new List<Organization>();

            _dbContext.Managers.Remove(manager);


            await _userManager.DeleteAsync(manager.IdentityUser);

            await _dbContext.SaveChangesAsync();
        }
    }
}
