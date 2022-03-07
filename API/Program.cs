using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace API
{
    public class Program
    {
        // Our program creates and startups our app.
        public static async Task Main(string[] args)
        {
            IHost host = CreateHostBuilder(args).Build();
            // Create scope & provider to use services
            using var scope = host.Services.CreateScope();
            var services = scope.ServiceProvider;
            try
            {
                DataContext context = services.GetRequiredService<DataContext>();
                // Setup DB from new migrations
                await context.Database.MigrateAsync();
                // Add data
                await Seed.LoadSeedData(context);
            }
            catch (Exception err)
            {
                // Logger service to log errors
                ILogger<Program> logger = services.GetRequiredService<ILogger<Program>>();
                logger.LogError(err, "An error occured during migration.");
            }
            await host.RunAsync();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
