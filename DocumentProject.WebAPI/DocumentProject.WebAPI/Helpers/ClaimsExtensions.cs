using DocumentProject.WebAPI.DTO;
using System.Security.Claims;

namespace DocumentProject.WebAPI.Helpers
{
    public static class ClaimsExtensions
    {
        public static UserInfo ToUserInfo(this ClaimsPrincipal claimsPrincipal)
        {
            return new UserInfo
            {
                UserName = claimsPrincipal.Identity.Name
            };
        }
    }
}
