using Microsoft.EntityFrameworkCore;
using Server.DB;
using Server.DTO;
using Server.Entities;
using Server.Interfaces;

namespace Server.Services
{
    public class CommentService : ICommentService
    {
        private MyDBContext _context;

        public CommentService(MyDBContext context)
        {
            _context = context;
        }

        public async Task<Comment> AddComment(CommentDTO comment)
        {           
            var foundPost = await _context.Posts.FindAsync(comment.PostId);
            var foundUser = await _context.Users.FirstOrDefaultAsync(x => x.Id == comment.UserId);
            
            if (foundPost != null && foundUser != null)
            {
                var item = new Comment
                {                   
                    PostId = foundPost.Id,
                    UserId = foundUser.Id,
                    Name = foundUser.Name,
                    Image = foundUser.Image,
                    Text = comment.Text,
                    CreateAt = comment.CreateAt,
                };

                var addingItem = await _context.Comments.AddAsync(item);

                await _context.SaveChangesAsync();

                return addingItem.Entity;
            }
            return null;
        }
        public async Task<List<Comment>> GetAllComments(int postid)
        {
            return await _context.Comments.Where(x =>(int) x.PostId == postid).ToListAsync();
        }
        public async Task<Comment> GetCommentById(int id)
        {
            var comment = await _context.Comments.FindAsync(id);
            if (comment != null)
            {
                return comment;
            }
            return null;
        }

      
        public async Task<Comment> UpdateComment(int id, CommentDTO comment)
        {
            var _comment = await _context.Comments.FindAsync(id);
            if (_comment != null)
            {
                _comment.Text = comment.Text;
                _context.Comments.Update(_comment);
                await _context.SaveChangesAsync();
                return _comment;
            }
            return null;
        }
        public async Task DeleteComment(int id)
        {
            var _comment = await _context.Comments.FindAsync(id);
            if (_comment != null)
            {
                _context.Comments.Remove(_comment);

                await _context.SaveChangesAsync();
            }
        }
    }
}