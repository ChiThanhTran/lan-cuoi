using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Server.DB;
using Server.DTO;
using Server.Entities;
using Server.Interfaces;
using Server.Models;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("MyPolicy")]
    // [Authorize(Roles = "Admin")]
    public class PostController : ControllerBase
    {
        private IPostService _service;
        private MyDBContext _context;

        public PostController(IPostService service, MyDBContext context)
        {
            _service = service;
            _context = context;
        }

        [HttpPost("/addpost")]
        public async Task<Post> AddPost(PostDTO post)
        {
            return await _service.AddPost(post);
        }

        // [AllowAnonymous]
        [HttpGet("/getallposts")]
        public async Task<List<Post>> GetAllPosts()
        {
            return await _service.GetAllPosts();
        }
        [HttpGet("/getallpostbystatus")]
        public async Task<List<Post>> GetAllPostByStatus(int status)
        {
            return await _service.GetAllPostByStatus(status);
        }
        [HttpGet("/getallpostbyuserid")]
        public async Task<List<Post>> GetAllPostByUserId(int userid)
        {
            return await _service.GetAllPostByUserId(userid);
        }
        [HttpGet("/getallpostbycategory")]
        public async Task<List<Post>> GetAllPostByCategory(int categoryid)
        {
            return await _service.GetAllPostByCategory(categoryid);
        }
        [HttpGet("/getallpostbytitle")]
        public async Task<List<Post>> GetAllPostByTitle([FromQuery] Pagination userPaging, string postTitle)
        {
            var count = _context.Posts.Where(x => x.PostTitle.ToLower().Contains(postTitle.ToLower())).Count();

            Response.Headers.Add("User-Pagination", count.ToString());

            return await _service.GetAllPostByTitle(postTitle, userPaging);
        }

        // [AllowAnonymous]
        [HttpGet("/getpost/{id:int}")]
        public async Task<Post> GetPostById(int id)
        {
            return await _service.GetPostById(id);
        }
        
        [HttpPut("/updatepost/{id:int}")]
        public async Task<Post> UpdatePost(int id, PostDTO post)
        {
            return await _service.UpdatePost(id, post);
        }
        [HttpDelete("/deletepost/{id:int}")]
        public async Task DeletePost(int id)
        {
            await _service.DeletePost(id);
        }
    }
}