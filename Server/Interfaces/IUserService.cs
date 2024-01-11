using Server.DTO;
using Server.Entities;
using Server.Models;

namespace Server.Interfaces
{
    public interface IUserService
    {
        Task<List<User>> GetAllUsers(string location, Pagination userPaging);

        Task<List<User>> GetAllUserByType(int type);

        Task<List<User>> GetAllUserByName(string name,Pagination userPaging);
        
        Task DeleteUser(int id);

        Task<User> GetUserById(int id);
       
        Task<User> UpdateUser(int id, UserDTO user);


        Task<User> Login (string username, string password);
    }
}