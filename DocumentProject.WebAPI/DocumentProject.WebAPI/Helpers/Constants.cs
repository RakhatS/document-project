using DocumentProject.WebAPI.DTO;

namespace DocumentProject.WebAPI.Helpers
{
    public static class Constants
    {
        public static readonly List<ApplicationNameDTO> ApplicationNames = new List<ApplicationNameDTO>
        {
            new ApplicationNameDTO { Name = "Employment Verification", Text = "This is to verify that {{Member.FullName}} has been employed with {{Organization.Name}} from {{Member.DateCreated}}, to the present as a {{Member.Position}}." },
            new ApplicationNameDTO { Name = "Rental Reference", Text = "This letter is to confirm that {{Member.FullName}} has been a tenant at our property located at {{Member.Address}}, from {{Member.DateCreated}}, to the present and has maintained a good rental history." },
            new ApplicationNameDTO { Name = "Academic Reference", Text = "This is to certify that {{Member.FullName}} was a student at {{Organization.Name}} from {{Member.DateCreated}}, to {{DateTime.Now}}, and graduated with a Bachelor of Science degree." },
            new ApplicationNameDTO { Name = "Character Reference", Text = "This is to confirm that {{Member.FullName}} has been an active member of our community center for the past five years and has shown exceptional character and leadership qualities." },
            new ApplicationNameDTO { Name = "Financial Reference", Text = "This is to certify that {{Member.FullName}} has maintained a savings account with {{Organization.Name}} since {{Member.DateCreated}}, and has demonstrated responsible financial behavior." },
            new ApplicationNameDTO { Name = "Medical Reference", Text = "This is to confirm that {{Member.FullName}} has been a patient at {{Organization.Name}} since {{Member.DateCreated}}, and has regularly attended his appointments and followed medical advice." },
            new ApplicationNameDTO { Name = "Volunteer Reference", Text = "This is to certify that {{Member.FullName}} has volunteered with our organization for over two years, contributing over 300 hours of service in various community projects." },
            new ApplicationNameDTO { Name = "Professional Reference", Text = "This is to verify that {{Member.FullName}} has provided consulting services to our company from {{Member.DateCreated}}, to {{DateTime.Now}}, delivering exceptional results." },
            new ApplicationNameDTO { Name = "Personal Reference", Text = "This letter is to confirm that {{Member.FullName}} has known {{Organization.OwnerManagerName}} for over ten years, attesting to her strong moral character and integrity." },
            new ApplicationNameDTO { Name = "Internship Reference", Text = "This is to certify that {{Member.FullName}} has successfully completed her internship at {{Organization.Name}} from {{Member.DateCreated}}, to {{DateTime.Now}}, demonstrating excellent technical skills and professionalism." }
        };
    }
}
