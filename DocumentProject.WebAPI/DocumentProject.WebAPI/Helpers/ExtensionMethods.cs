using DocumentProject.WebAPI.Data;

namespace DocumentProject.WebAPI.Helpers
{
    public static class ExtensionMethods
    {
        public static async Task<string> GetApplicationText(string applicationName, Member member, Organization organization)
        {
            string text = string.Empty;

            var applicationNameText = Constants.ApplicationNames.Find(x => x.Name == applicationName);

            if (applicationNameText == null)
            {
                throw new Exception("Invalid application name");
            }

            text = applicationNameText.Text;

            text = text.Replace("{{Member.FullName}}", $"{member.FirstName} {member.LastName}");
            text = text.Replace("{{Organization.Name}}", $"{organization.Name}");
            text = text.Replace("{{Member.DateCreated}}", $"{member.DateCreated.ToString("dddd, dd MMMM yyyy")}");
            text = text.Replace("{{DateTime.Now}}", $"{DateTime.Now.ToString("dddd, dd MMMM yyyy")}");
            text = text.Replace("{{Member.Position}}", $"{member.Position}");
            text = text.Replace("{{Member.Address}}", $"{member.Address}");
            text = text.Replace("{{Organization.OwnerManagerName}}", $"{organization.OwnerManager.FirstName} {organization.OwnerManager.LastName}");

            return text;
        }


        public static async Task<string> GetApplicationContent(string applicationName, Member member, Organization organization)
        {
            var content = string.Empty;


            return content;
        }
    }
}
