using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        // TODO Method can be void since we pass by ref.
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            // Add our created services
            services.AddScoped<ITokenService, TokenService>();
            // Configure sqlite
            services.AddDbContext<DataContext>(options =>
            {
                // We use config. file (from app settings dev) to init. our db connection
                options.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });
            return services;
        }
    }
}
