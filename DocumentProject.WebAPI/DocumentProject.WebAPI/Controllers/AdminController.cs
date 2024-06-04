using AutoMapper;
using DocumentProject.WebAPI.Abstract;
using DocumentProject.WebAPI.Data;
using DocumentProject.WebAPI.DTO;
using DocumentProject.WebAPI.Helpers;
using DocumentProject.WebAPI.Views;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DocumentProject.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IFilesDestination _filesDestination;

        public AdminController(ApplicationDbContext dbContext,
            IFilesDestination filesDestination)
        {
            _dbContext = dbContext;
            _filesDestination = filesDestination;
        }



        [Authorize(Roles = "Admin")]
        [HttpGet("Current")]
        public async Task<AdminDTO?> CurrentAdmin()
        {
            var admin = await _dbContext.Admins
                .Include(x => x.IdentityUser)
                .SingleOrDefaultAsync(x => x.IdentityUser.Email == User.ToUserInfo().UserName
                            || x.IdentityUser.UserName == User.ToUserInfo().UserName);


            if (admin == null)
                return null;


            return Mapper.Map<Admin, AdminDTO>(admin);
        }







        [Authorize(Roles = "Admin")]
        [HttpPut("Update")]
        public async Task UpdateAdmin([FromBody] AdminDTO updatedAdmin)
        {
            var admin = await _dbContext.Admins
               .SingleOrDefaultAsync(x => x.IdentityUser.Email == User.ToUserInfo().UserName
                            || x.IdentityUser.UserName == User.ToUserInfo().UserName);


            if (admin == null)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync("Admin not found");
                return;
            }

            admin.FirstName = updatedAdmin.FirstName;
            admin.LastName = updatedAdmin.LastName;

            await _dbContext.SaveChangesAsync();

        }






        [HttpPost("UploadProfilePhoto")]
        [Authorize(Roles = "Admin")]
        public async Task UploadProfilePhoto([FromBody] PhotoModel photoModel)
        {
            var admin = await _dbContext.Admins
                .SingleOrDefaultAsync(x => x.IdentityUser.Email == User.ToUserInfo().UserName
                             || x.IdentityUser.UserName == User.ToUserInfo().UserName);


            if (admin == null)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync("Admin not found");
                return;
            }


            var imageDataStream = new MemoryStream(photoModel.PhotoBase64);
            imageDataStream.Position = 0;
            var fileName = $"admin_avatar_{admin.Id}.png";
            var path = Path.Combine(_filesDestination.UserPhotosDirectory, fileName);
            using (var stream = new FileStream(path, FileMode.Create))
            {
                await imageDataStream.CopyToAsync(stream);
            }
            admin.PhotoUrl = path;

            await _dbContext.SaveChangesAsync();

        }

    }
}
