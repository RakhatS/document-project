using DocumentProject.WebAPI.DTO;
using DocumentProject.WebAPI.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DocumentProject.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConstDataController : ControllerBase
    {
        [HttpGet("ApplicationNames")]
        public async Task<List<ApplicationNameDTO>> GetApplicationNames()
        {
            return Constants.ApplicationNames;
        }
    }
}
