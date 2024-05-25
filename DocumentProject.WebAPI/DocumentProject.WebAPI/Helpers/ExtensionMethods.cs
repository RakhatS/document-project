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


        public static async Task<string> GetApplicationContent(Application application)
        {
            var content = "<!DOCTYPE html>\r\n<html lang=\"ru\">\r\n\r\n<head>\r\n  <meta charset=\"UTF-8\">\r\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n  <title>Reference</title>\r\n  <style>\r\n    body {\r\n      font-family: Arial, sans-serif;\r\n      margin: 0;\r\n      padding: 0;\r\n      line-height: 1.6;\r\n      background-color: #f4f4f4;\r\n    }\r\n\r\n    .container {\r\n      width: 70%;\r\n      margin: 20px auto;\r\n      padding: 20px;\r\n      background: #fff;\r\n      border: 1px solid #ddd;\r\n      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\r\n    }\r\n\r\n    .header {\r\n      text-align: center;\r\n      margin-bottom: 20px;\r\n    }\r\n\r\n    .header h1 {\r\n      margin: 0;\r\n      font-size: 28px;\r\n    }\r\n\r\n    .header h2 {\r\n      margin: 0;\r\n      font-size: 22px;\r\n      font-weight: normal;\r\n    }\r\n\r\n    .content {\r\n      margin-bottom: 20px;\r\n    }\r\n\r\n    .content p {\r\n      margin: 10px 0;\r\n    }\r\n\r\n    .footer {\r\n      display: flex;\r\n      justify-content: space-between;\r\n      align-items: flex-end;\r\n      margin-top: 40px;\r\n    }\r\n\r\n    .signature {\r\n      text-align: left;\r\n    }\r\n\r\n    .signature p {\r\n      margin: 5px 0;\r\n    }\r\n\r\n    .stamp {\r\n      text-align: center;\r\n      position: absolute;\r\n      right: 15%;\r\n    }\r\n\r\n    .stamp-circle-1 {\r\n      width: 120px;\r\n      height: 120px;\r\n      border: 4px solid blue;\r\n      border-radius: 50%;\r\n      display: flex;\r\n      align-items: center;\r\n      justify-content: right;\r\n      margin-left: 20px;\r\n      font-size: 12px;\r\n      padding: 10px;\r\n      box-sizing: border-box;\r\n    }\r\n    .stamp-circle-2 {\r\n      width: 100px;\r\n      height: 100px;\r\n      border: 2px solid blue;\r\n      border-radius: 50%;\r\n      display: flex;\r\n      align-items: center;\r\n      justify-content: center;\r\n      margin-left: 20px;\r\n      font-size: 12px;\r\n      padding: 10px;\r\n      box-sizing: border-box;\r\n    }\r\n\r\n    .doc-name {\r\n      margin-bottom: 20px;\r\n    }\r\n  </style>\r\n</head>\r\n\r\n<body>\r\n  <div class=\"container\">\r\n    <div class=\"header\">\r\n      <h1>Reference</h1>\r\n      <h2>Official document</h2>\r\n    </div>\r\n    <div class=\"doc-name\">\r\n      <p><strong>Reference name:</strong> {{Application.Name}}</p>\r\n    </div>\r\n    <div class=\"content\">\r\n      <p><strong>Name of the organization:</strong> {{Organization.Name}}</p>\r\n      <p><strong>Member's name:</strong> {{Member.FullName}}</p>\r\n      <p><strong>Address:</strong> {{Organization.Address}}</p>\r\n      <p><strong>Contact number:</strong> {{Organization.ContactNumber}}</p>\r\n      <p><strong>Date:</strong> {{Application.SignatureDate}}</p>\r\n      <p><strong>Reference text:</strong></p>\r\n      <p>{{Application.Text}}</p>\r\n    </div>\r\n    <div class=\"footer\">\r\n      <div class=\"signature\">\r\n        <p><strong>Signature:</strong> __________________________</p>\r\n        <p><strong>Full name:</strong> {{OwnerManager.FullName}}</p>\r\n        <p><strong>Job title:</strong> Director</p>\r\n      </div>\r\n      <div class=\"stamp\">\r\n        <div class=\"stamp-circle-1\">\r\n          <div class=\"stamp-circle-2\">\r\n            <p>{{Organization.Name}}<br>{{Organization.BIN}}</p>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n    </div>\r\n  </div>\r\n</body>\r\n\r\n</html>";


            content = content.Replace("{{Application.Name}}", $"{application.Name}");
            content = content.Replace("{{Organization.Name}}", $"{application.Organization.Name}");
            content = content.Replace("{{Member.FullName}}", $"{application.Member.FirstName} {application.Member.LastName}");
            content = content.Replace("{{Organization.Address}}", $"{application.Organization.Address}");
            content = content.Replace("{{Organization.ContactNumber}}", $"{application.Organization.ContactNumber}");
            content = content.Replace("{{Application.SignatureDate}}", $"{application.SignatureDate}");
            content = content.Replace("{{Application.Text}}", $"{application.Text}");
            content = content.Replace("{{OwnerManager.FullName}}", $"{application.Organization.OwnerManager.FirstName} {application.Organization.OwnerManager.LastName}");
            content = content.Replace("{{Organization.BIN}}", $"{application.Organization.BIN}");

            return content;
        }
    }
}
