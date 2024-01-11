using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Server.DTO;
using Server.Entities;
using Server.Interfaces;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("MyPolicy")]
    // [Authorize(Roles = "Admin")]
    public class CommentController : ControllerBase
    {
        private ICommentService _service;

        public CommentController(ICommentService service)
        {
            _service = service;
        }

        [HttpPost("/addcomment")]
        public async Task<Comment> AddComment(CommentDTO comment)
        {
            return await _service.AddComment(comment);
        }
        [HttpGet("/getallcomment")]
        public async Task<List<Comment>> GetAllComments(int postid)
        {
            return await _service.GetAllComments(postid);
        }
        [HttpGet("/getcomment/{id:int}")]
        public async Task<Comment> GetCommentById(int id)
        {
            return await _service.GetCommentById(id);
        }
       
        [HttpPut("/updatecomment/{id:int}")]
        public async Task<Comment> UpdateComment(int id, CommentDTO comment)
        {
            return await _service.UpdateComment(id, comment);
        }
        [HttpDelete("/deletecomment/{id:int}")]
        public async Task DeleteComment(int id)
        {
            await _service.DeleteComment(id);
        }
    }
}