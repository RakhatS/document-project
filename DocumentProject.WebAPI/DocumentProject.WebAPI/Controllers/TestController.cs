using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using iTextSharp.text;
using iTextSharp.text.pdf;
using iTextSharp.text.html.simpleparser;

namespace DocumentProject.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        [HttpGet]
        public async Task Get()
        {
            string htmlContent = "<!DOCTYPE html>\r\n<html lang=\"en\">\r\n<head>\r\n    <meta charset=\"UTF-8\">\r\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n    <title>Letter</title>\r\n    <style>\r\n        body {\r\n            font-family: Arial, sans-serif;\r\n            margin: 40px;\r\n        }\r\n        .letter-header, .letter-body, .letter-footer {\r\n            margin-bottom: 20px;\r\n        }\r\n        .letter-header {\r\n            text-align: right;\r\n        }\r\n        .letter-header p, .letter-body p, .letter-footer p {\r\n            margin: 5px 0;\r\n        }\r\n        .letter-body {\r\n            text-align: left;\r\n        }\r\n        .letter-footer {\r\n            text-align: left;\r\n        }\r\n        .signature {\r\n            margin-top: 50px;\r\n        }\r\n        .signature img {\r\n            width: 100px;\r\n        }\r\n    </style>\r\n</head>\r\n<body>\r\n    <div class=\"letter-header\">\r\n        <p>Urna Semper</p>\r\n        <p>1234 Main Street</p>\r\n        <p>Anytown, State ZIP</p>\r\n        <p>123-456-7890</p>\r\n        <p>no_reply@example.com</p>\r\n        <p>16 June 2018</p>\r\n    </div>\r\n    \r\n    <div class=\"letter-body\">\r\n        <p>Trenz Pruca<br>\r\n        4321 First Street<br>\r\n        Anytown, State ZIP</p>\r\n        \r\n        <p>Dear Trenz,</p>\r\n        \r\n        <p>Lorem ipsum dolor sit amet, ligula suspendisse nulla pretium, rhoncus tempor fermentum, enim integer ad vestibulum volutpat. Nisl rhoncus turpis est, vel elit, congue wisi enim nunc ultricies sit, magna tincidunt. Maecenas aliquam maecenas ligula nostra, accumsan taciti. Sociis mauris in integer, a dolor netus non dui aliquet, sagittis felis sodales, dolor sociis mauris, vel eu libero cras. Faucibus at. Arcu habitasse elementum est, ipsum purus pede porttitor class.</p>\r\n        \r\n        <p>Ac dolor ac adipiscing amet bibendum nullam, lacus molestie ut libero nec, diam et, pharetra sodales, feugiat ullamcorper id tempor id vitae. Mauris pretium aliquet, lectus tincidunt. Porttitor mollis imperdiet libero senectus pulvinar. Etiam molestie mauris ligula laoreet, vehicula eleifend. Repellat orci erat et, sem cum, ultricies sollicitudin amet eleifend dolor.</p>\r\n        \r\n        <p>Consectetuer arcu ipsum ornare pellentesque vehicula, in vehicula diam, ornare magna erat felis wisi a risus. Justo fermentum id. Malesuada eleifend, tortor molestie, a a vel et. Mauris at suspendisse, neque aliquam faucibus adipiscing, vivamus in. Wisi mattis leo suscipit nec amet, nisl fermentum tempor ac a, augue in eleifend in venenatis, cras sit id in vestibulum felis in, sed ligula.</p>\r\n    </div>\r\n    \r\n    <div class=\"letter-footer\">\r\n        <p>Sincerely,</p>\r\n        \r\n        <p class=\"signature\">\r\n            <img src=\"https://www.mplux.kz/images/obrazci/too/obrazec_too-1.jpg\" alt=\"Signature\"><br>\r\n            Urna Semper\r\n        </p>\r\n    </div>\r\n</body>\r\n</html>\r\n";
            using (var memoryStream = new MemoryStream())
            {
                using (var document = new Document())
                {
                    PdfWriter writer = PdfWriter.GetInstance(document, memoryStream);
                    document.Open();
                    using (var stringReader = new StringReader(htmlContent))
                    {
                        HTMLWorker htmlParser = new HTMLWorker(document);
                        htmlParser.Parse(stringReader);
                    }
                    document.Close();
                }


                System.IO.File.WriteAllBytes("customHtmlContent.pdf", memoryStream.ToArray());

            }
        }
    }
}
