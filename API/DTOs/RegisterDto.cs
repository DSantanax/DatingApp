using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        // Data annotations for the API Controller to perform validation
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
