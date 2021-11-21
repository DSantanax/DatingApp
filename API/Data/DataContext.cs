using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        { 
        
        }
        // Property used for gen. a db set
            public DbSet<AppUser> Users { get; set; }
        }
    }
