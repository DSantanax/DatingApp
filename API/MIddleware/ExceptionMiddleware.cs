using API.Errors;
using System.Net;
using System.Text.Json;

namespace API.MIddleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IHostEnvironment _env;

        // Request delegate -- what is up next in the middleware pipeline, Logger used to log info to terminal, IHostEnv - check which env we are on
        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
        {
            this._next = next;
            this._logger = logger;
            this._env = env;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            } 
            catch (Exception ex)
            {
                // Handle the error, log, and build the response 
                _logger.LogError(ex, ex.Message);
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int) HttpStatusCode.InternalServerError;

                var res = _env.IsDevelopment() ? new ApiException(context.Response.StatusCode, ex.Message, ex.StackTrace?.ToString())
                    : new ApiException(context.Response.StatusCode, "Interal Server Error");

                var jsonOpt = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

                var jsonRes = JsonSerializer.Serialize(res, jsonOpt);

                await context.Response.WriteAsync(jsonRes);
            }
        }
    }
}
