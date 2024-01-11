using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("MyPolicy")]
    public class ImageController : ControllerBase
    {
        private IWebHostEnvironment environment;
        public ImageController(IWebHostEnvironment _environment)
        {
            environment = _environment;
        }

        [HttpPost("/addImage")]
        public async Task<IActionResult> AddImage(IFormFile upload)
        {
            if (upload != null && upload.Length > 0)
            {
                var fileFolder = "images";
                var fileName = DateTime.Now.ToString("yyyyMMddHHmmss") + upload.FileName;
                var filePath = Path.Combine(Directory.GetCurrentDirectory(), environment.WebRootPath, fileFolder + "\\" + fileName);
                var fileStream = new FileStream(filePath, FileMode.Create);
                await upload.CopyToAsync(fileStream);

                var jsonObject = new
                {
                    uploaded = true,
                    url = $"https://{Request.Host}/{fileFolder}/{fileName}"
                };
                return Ok(jsonObject);
            }
            return BadRequest();
        }
    }
}