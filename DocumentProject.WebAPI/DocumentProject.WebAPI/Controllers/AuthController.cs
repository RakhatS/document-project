using DocumentProject.WebAPI.Data;
using DocumentProject.WebAPI.Data.Enums;
using DocumentProject.WebAPI.Helpers;
using DocumentProject.WebAPI.Views;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace DocumentProject.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly ApplicationDbContext _dbContext;


        public AuthController(ApplicationDbContext dbContext,
                                  UserManager<IdentityUser> userManager,
                                  RoleManager<IdentityRole> roleManager,
                                  SignInManager<IdentityUser> signInManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _signInManager = signInManager;
            _dbContext = dbContext;
        }





        [HttpPost]
        [Route("Manager/SignUp")]
        public async Task ManagerSignUp([FromBody] RegisterViewModel model)
        {
            model.Email = model.Email.ToLower().Trim();

            var role = UserRole.Manager.ToString();

            await _roleManager.CreateAsync(new IdentityRole(role));

            var existingEmail = await _userManager.FindByEmailAsync(model.Email);
            if (existingEmail != null)
            {

                Response.ContentType = "application/json";
                Response.StatusCode = 409;
                await Response.WriteAsync("Email exists");
                return;
            }


            var user = new IdentityUser();
            user.Email = model.Email;
            user.UserName = model.Email;
            await _userManager.CreateAsync(user, model.Password);


            await _userManager.AddToRoleAsync(user, role);
            var person = new Manager();
            person.IdentityUser = user;
            person.FirstName = model.FirstName;
            person.LastName = model.LastName;
            await _dbContext.Managers.AddAsync(person);
            await _dbContext.SaveChangesAsync(default);

            //await Token(model.Email);
        }






        [HttpPost]
        [Route("SignIn")]
        public async Task<object?> SignIn([FromBody] LoginViewModel model)
        {
            model.Email = model.Email.ToLower().Trim();

 
            var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, false, false);
            if (!result.Succeeded)
            {

                Response.StatusCode = 401;
                await Response.WriteAsync("Invalid username or password.");
                return null;
            }

            if (await _dbContext.Managers.AnyAsync(x => x.IdentityUser.UserName == model.Email))
            {
                return await TokenGenerator.GenerateToken(model.Email, UserRole.Manager.ToString());
            }
            else if(await _dbContext.Members.AnyAsync(x => x.IdentityUser.UserName == model.Email))
            {
                return await TokenGenerator.GenerateToken(model.Email, UserRole.Member.ToString());
            }

            return null;
        }




        [HttpPost]
        [Route("Manager/SignIn")]
        public async Task<object?> ManagerSignIn([FromBody] LoginViewModel model)
        {
            model.Email = model.Email.ToLower().Trim();

            if (await _dbContext.Managers.AnyAsync(x => x.IdentityUser.UserName == model.Email) == false)
            {
                Response.StatusCode = 401;
                await Response.WriteAsync("Invalid username or password.");
                return null;
            }



            var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, false, false);
            if (!result.Succeeded)
            {

                Response.StatusCode = 401;
                await Response.WriteAsync("Invalid username or password.");
                return null;
            }


            return await TokenGenerator.GenerateToken(model.Email, UserRole.Manager.ToString());
        }



        [HttpPost]
        [Route("Member/SignIn")]
        public async Task<object?> MemberSignIn([FromBody] LoginViewModel model)
        {
            model.Email = model.Email.ToLower().Trim();

            if (await _dbContext.Members.AnyAsync(x => x.IdentityUser.UserName == model.Email) == false)
            {
                Response.StatusCode = 401;
                await Response.WriteAsync("Invalid username or password.");
                return null;
            }



            var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, false, false);
            if (!result.Succeeded)
            {

                Response.StatusCode = 401;
                await Response.WriteAsync("Invalid username or password.");
                return null;
            }


            return await TokenGenerator.GenerateToken(model.Email, UserRole.Member.ToString());
        }

    }
}
