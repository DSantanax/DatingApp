using API.Entities;
using API.DTOs;
using AutoMapper;
using API.Extensions;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            // Setup profiles in constructor
            CreateMap<AppUser, MemberDto>()
                // Map setup for PhotoUrl in DTO
                .ForMember(
                    dest => dest.PhotoUrl,
                    options => options
                           .MapFrom(src => src.Photos.FirstOrDefault(photo => photo.IsMain).Url))
                .ForMember(
                    dest => dest.Age,
                    options => options.MapFrom(src => src.DateOfBirth.CalculateAge())
                    );
            CreateMap<Photo, PhotoDto>();
            CreateMap<MemberUpdateDto, AppUser>();
        }
    }
}
