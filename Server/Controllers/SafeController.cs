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
    public class SafeController : ControllerBase
    {
        private ISafeService _service;

        public SafeController(ISafeService service)
        {
            _service = service;
        }

        [HttpPost("/addsafe")]
        public async Task<Safe> AddSafe(SafeDTO safe)
        {
            return await _service.AddSafe(safe);
        }
        [HttpGet("/getallsafe")]
        public async Task<List<Safe>> GetAllSafe(int UserId)
        {
            return await _service.GetAllSafe(UserId);
        }
           
        [HttpDelete("/deletesafe")]
        public async Task DeleteSafe(int UserId, int PostId)
        {
            await _service.DeleteSafe(UserId, PostId);
        }
    }
}