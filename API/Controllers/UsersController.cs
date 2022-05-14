using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{   
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _userRepo;
        private readonly IMapper _mapper;
        public UsersController(IUserRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _userRepo = repo;
        }
        // api/users
        // attributes from Auth. package for JWT auth.
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            return Ok(await _userRepo.GetMembersAsync());
            // Wrap IEnum to Ok object 
        }
        // add params
        // api/users/3
        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            return await _userRepo.GetMemberAsync(username);
        }
        [HttpPut]
        public async Task<ActionResult> UpdateMember(MemberUpdateDto memberUpdateDto) {
            // Get claims from the JWT (claims are unique)
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _userRepo.GetUserByUsernameAsync(username);
            // Map a memberUpdateDto to AppUser for updates
            var appUser = _mapper.Map<MemberUpdateDto, AppUser>(memberUpdateDto, user);
            
            // notify Entity Framework
            _userRepo.Update(appUser);
            // Update db from modified entities
            if(await _userRepo.SaveAllAsync()) {
                return NoContent();
            }

            return BadRequest("Failed to update user.");
        }
    }
}
