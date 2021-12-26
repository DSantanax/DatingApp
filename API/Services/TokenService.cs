using API.Entities;
using API.Interfaces;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace API.Services
{
    public class TokenService : ITokenService
    {
        // sign and verify our JWT token
        private readonly SymmetricSecurityKey _symmKey;
        // Use IConfig to set our key
        public TokenService(IConfiguration config)
        {
            // set our symm. key from the config file (appsettings.json)
            // the key will be a string -- but we use Bytes for the algo.
            _symmKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
        }

        public string CreateToken(AppUser user)
        {
            // create our claims
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.NameId, user.UserName)
            };
            // info. of our signing sig.
            var creds = new SigningCredentials(_symmKey, SecurityAlgorithms.HmacSha512Signature);
            // Our main token credentials (claims - payload , headers - type , and sig)
            var tokenDesc = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(3),
                SigningCredentials = creds
            };

            // create handler
            var tokenHandler = new JwtSecurityTokenHandler();

            // create token using our tokenDesc
            var token = tokenHandler.CreateToken(tokenDesc);

            // serialize JWT to JWE (encrypts our data)
            return tokenHandler.WriteToken(token);
        }
    }
}
