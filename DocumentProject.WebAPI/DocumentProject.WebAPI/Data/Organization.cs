using DocumentProject.WebAPI.Data.Abstract;

namespace DocumentProject.WebAPI.Data
{
    public class Organization : Entity
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public string BIN { get; set; }
        public string Address { get; set; }
        public string ContactNumber {  get; set; }
        public Guid? OwnerManagerId { get; set; }
        public Manager? OwnerManager { get; set; }

        public List<Member> Members { get; set; }
        public List<Application> Applications { get; set; }
    }
}
