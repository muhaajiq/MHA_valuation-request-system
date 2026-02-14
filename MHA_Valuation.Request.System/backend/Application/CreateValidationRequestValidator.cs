using Application.DTOs;
using FluentValidation;
using Infrastructure;

namespace Application
{
    public class CreateValidationRequestValidator : AbstractValidator<CreateValidationRequestDto>
    {
        public CreateValidationRequestValidator(AppDbContext db)
        {
            RuleFor(x => x.PropertyAddress).NotEmpty().MaximumLength(200);
            RuleFor(x => x.RequestedValue).GreaterThan(0);
            RuleFor(x => x.PropertyTypeId).Must(id => db.PropertyTypes.Any(p => p.Id == id)).WithMessage("Invalid property type");
            RuleFor(x => x.Remarks).MaximumLength(500);
        }
    }

}
