using DocumentProject.WebAPI.Data;
using DocumentProject.WebAPI.Data.Enums;

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


        public static async Task<string> GetApplicationDocument(Application application)
        {
            var document = "\r\n<div style=\"width: 70%; margin: 20px auto; padding: 20px; background: #fff; border: 1px solid #ddd; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\">\r\n    <div style=\"text-align: center; margin-bottom: 20px;\">\r\n        <h1 style=\"margin: 0; font-size: 28px;\">Reference</h1>\r\n        <h2 style=\"margin: 0; font-size: 22px; font-weight: normal;\">Official document</h2>\r\n    </div>\r\n    <div style=\"margin-bottom: 20px;\">\r\n        <p><strong>Reference name:</strong> {{Application.Name}}</p>\r\n        <p style=\"margin: 10px 0;\"><strong>Name of the organization:</strong> {{Organization.Name}}</p>\r\n        <p style=\"margin: 10px 0;\"><strong>Member's name:</strong> {{Member.FullName}}</p>\r\n        <p style=\"margin: 10px 0;\"><strong>Address:</strong> {{Organization.Address}}</p>\r\n        <p style=\"margin: 10px 0;\"><strong>Contact number:</strong> {{Organization.ContactNumber}}</p>\r\n        <p style=\"margin: 10px 0;\"><strong>Date:</strong> {{Application.SignatureDate}}</p>\r\n        <p style=\"margin: 10px 0;\"><strong>Reference text:</strong></p>\r\n        <p style=\"margin: 10px 0;\">{{Application.Text}}</p>\r\n    </div>\r\n    <div style=\"display: flex; justify-content: space-between; align-items: flex-end; margin-top: 40px;\">\r\n        <div style=\"text-align: left;\">\r\n            <p style=\"margin: 5px 0;\"><strong>Signature:</strong> __________________________</p>\r\n            <p style=\"margin: 5px 0;\"><strong>Full name:</strong> {{OwnerManager.FullName}}</p>\r\n            <p style=\"margin: 5px 0;\"><strong>Job title:</strong> Director</p>\r\n        </div>\r\n        <div style=\"text-align: center; position: absolute; right: 20%;\">\r\n            <div style=\"width: 120px; height: 120px; border: 4px solid blue; border-radius: 50%; display: flex; align-items: center; justify-content: right; margin-left: 20px; font-size: 12px; padding: 10px; box-sizing: border-box;\">\r\n                <div style=\"width: 100px; height: 100px; border: 2px solid blue; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-left: 20px; font-size: 12px; padding: 10px; box-sizing: border-box;\">\r\n                    <p>{{Organization.Name}}<br>{{Organization.BIN}}</p>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n";

            if(application.Status != ApplicationStatus.Signed.ToString())
            {
                document = "<div style=\"width: 70%; margin: 20px auto; padding: 20px; background: #fff; border: 1px solid #ddd; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\">\r\n    <div style=\"text-align: center; margin-bottom: 20px;\">\r\n        <h1 style=\"margin: 0; font-size: 28px;\">Reference</h1>\r\n        <h2 style=\"margin: 0; font-size: 22px; font-weight: normal;\">Official document</h2>\r\n    </div>\r\n    <div style=\"margin-bottom: 20px;\">\r\n        <p><strong>Reference name:</strong> {{Application.Name}}</p>\r\n        <p style=\"margin: 10px 0;\"><strong>Name of the organization:</strong> {{Organization.Name}}</p>\r\n        <p style=\"margin: 10px 0;\"><strong>Member's name:</strong> {{Member.FullName}}</p>\r\n        <p style=\"margin: 10px 0;\"><strong>Address:</strong> {{Organization.Address}}</p>\r\n        <p style=\"margin: 10px 0;\"><strong>Contact number:</strong> {{Organization.ContactNumber}}</p>\r\n        <p style=\"margin: 10px 0;\"><strong>Date:</strong> {{Application.SignatureDate}}</p>\r\n        <p style=\"margin: 10px 0;\"><strong>Reference text:</strong></p>\r\n        <p style=\"margin: 10px 0;\">{{Application.Text}}</p>\r\n    </div>\r\n    <div style=\"display: flex; justify-content: space-between; align-items: flex-end; margin-top: 40px;\">\r\n        <div style=\"text-align: left;\">\r\n            <p style=\"margin: 5px 0;\"><strong>Signature:</strong> __________________________</p>\r\n            <p style=\"margin: 5px 0;\"><strong>Full name:</strong> {{OwnerManager.FullName}}</p>\r\n            <p style=\"margin: 5px 0;\"><strong>Job title:</strong> Director</p>\r\n        </div>\r\n    </div>\r\n</div>";
            }

            document = document.Replace("{{Application.Name}}", $"{application.Name}");
            document = document.Replace("{{Organization.Name}}", $"{application.Organization.Name}");
            document = document.Replace("{{Member.FullName}}", $"{application.Member.FirstName} {application.Member.LastName}");
            document = document.Replace("{{Organization.Address}}", $"{application.Organization.Address}");
            document = document.Replace("{{Organization.ContactNumber}}", $"{application.Organization.ContactNumber}");
            document = document.Replace("{{Application.SignatureDate}}", $"{application.SignatureDate}");
            document = document.Replace("{{Application.Text}}", $"{application.Text}");
            document = document.Replace("{{OwnerManager.FullName}}", $"{application.Organization.OwnerManager.FirstName} {application.Organization.OwnerManager.LastName}");
            document = document.Replace("{{Organization.BIN}}", $"{application.Organization.BIN}");

            return document;
        }
    }
}
