using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        // Dependency injection
       public AccountController(DataContext context, ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }
        // attr. binds the params from the method to the data
        // Takes in a register object
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            // Check if username already exists in db
            if (await UserExists(registerDto.Username))
            {
                return BadRequest("Username is taken.");
            }
            using var hmac = new HMACSHA512();

            // Hash takes in and outputs bytes[]
            var user = new AppUser()
            {
                // Lowercase username
                UserName = registerDto.Username.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };
            // Keep tracking of user in state
            _context.Add(user);
            // Add to DB async.
            await _context.SaveChangesAsync();
            return new UserDto
            {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {            
            using var hmac = new HMACSHA512();
            // get user
            var user = await _context.Users.SingleOrDefaultAsync(user => user.UserName == loginDto.Username.ToLower());
            if (user == null) return Unauthorized("Invalid username and/or password.");
            // user is found, set salt
            hmac.Key = user.PasswordSalt;
            // hash password
            byte[] hashPass = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
            // compare hashes
            for(int i = 0; i < hashPass.Length; i++)
            {
                if(hashPass[i] != user.PasswordHash[i])
                {
                    return Unauthorized("Invalid username and/or password.");
                }
            }
            // same pass, successful login
            return new UserDto
            {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }
        // Check if username already exists
        private async Task<bool> UserExists(string username)
        {
            return await _context.Users.AnyAsync(user => user.UserName == username.ToLower());
        }
    }
}
