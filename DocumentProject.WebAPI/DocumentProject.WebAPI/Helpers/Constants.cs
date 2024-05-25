using DocumentProject.WebAPI.DTO;

namespace DocumentProject.WebAPI.Helpers
{
    public static class Constants
    {
        public static readonly List<ApplicationNameDTO> ApplicationNames = new List<ApplicationNameDTO>
        {
             new ApplicationNameDTO { Name = "Employment Verification", Text = "This is to verify that John Doe has been employed with ABC Corporation from January 1, 2020, to the present as a Senior Software Engineer." },
    new ApplicationNameDTO { Name = "Rental Reference", Text = "This letter is to confirm that Emily Johnson has been a tenant at our property located at 789 Pine Street, Springfield, from February 1, 2021, to the present and has maintained a good rental history." },
    new ApplicationNameDTO { Name = "Academic Reference", Text = "This is to certify that Sarah Miller was a student at Springfield University from September 1, 2019, to May 15, 2024, and graduated with a Bachelor of Science degree in Biology." },
    new ApplicationNameDTO { Name = "Character Reference", Text = "This is to confirm that David Lee has been an active member of our community center for the past five years and has shown exceptional character and leadership qualities." },
    new ApplicationNameDTO { Name = "Financial Reference", Text = "This is to certify that Laura Adams has maintained a savings account with First National Bank since January 1, 2018, and has demonstrated responsible financial behavior." },
    new ApplicationNameDTO { Name = "Medical Reference", Text = "This is to confirm that Michael Carter has been a patient at Springfield Medical Center since March 1, 2015, and has regularly attended his appointments and followed medical advice." },
    new ApplicationNameDTO { Name = "Volunteer Reference", Text = "This is to certify that Jennifer Brown has volunteered with our organization for over two years, contributing over 300 hours of service in various community projects." },
    new ApplicationNameDTO { Name = "Professional Reference", Text = "This is to verify that William Davis has provided consulting services to our company from April 1, 2019, to December 31, 2023, delivering exceptional results." },
    new ApplicationNameDTO { Name = "Personal Reference", Text = "This letter is to confirm that Robert Wilson has known Emily Clark for over ten years, attesting to her strong moral character and integrity." },
    new ApplicationNameDTO { Name = "Business Reference", Text = "This is to certify that the partnership between Springfield Enterprises and ABC Logistics has been in place since January 1, 2020, and has been mutually beneficial." }
        };
    }
}
