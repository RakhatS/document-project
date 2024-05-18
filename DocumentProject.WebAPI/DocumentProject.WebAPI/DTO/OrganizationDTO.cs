
using DocumentProject.WebAPI.DTO.Abstract;

namespace DocumentProject.WebAPI.DTO
{
    public class OrganizationDTO : BaseDTO
    {
        public string Name { get; set; }
        public string Type { get; set; }

        public Guid OwnerManagerId { get; set; }
    }
}
