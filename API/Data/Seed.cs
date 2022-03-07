using API.Entities;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

namespace API.Data
{
    public class Seed
    {
        public static async Task LoadSeedData(DataContext context)
        {
            // Data already exists
            if (await context.Users.AnyAsync()) { return; }
            string dataSeed = File.ReadAllText("Data/UserSeedData.json");
            // JSON data is a list of users
            List<AppUser> userJson = JsonSerializer.Deserialize<List<AppUser>>(dataSeed);

            foreach(var user in userJson)
            {
                using HMACSHA512 hmac = new HMACSHA512();
                user.UserName = user.UserName.ToLower();
                user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("P@$$W0RD!"));
                user.PasswordSalt = hmac.Key;
                // Add user to EF tracking
                context.Users.Add(user);
            }
            // Save changes to DB
            await context.SaveChangesAsync();
        }
    }
}
