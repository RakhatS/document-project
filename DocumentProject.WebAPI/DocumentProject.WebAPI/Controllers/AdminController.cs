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

    }
}
