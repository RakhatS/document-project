using DocumentProject.WebAPI.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
    }
}
