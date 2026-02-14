using Application.DTOs;
using AutoMapper;
using Domain;

namespace Application
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<ValidationRequest, ValidationRequestDto>().ForMember(dest => dest.PropertyType, opt => opt.MapFrom(source => source.PropertyType!.Name));
        }
    }
}
