using Application.DTO;
using Domain.Constants;
using FluentValidation;

namespace Application.Validators
{
    public class AddRuleValidation : AbstractValidator<AddRuleDto>
    {
        public AddRuleValidation() 
        {
            RuleFor(x => x.Keyword)
                  .NotNull()
                  .NotEmpty()
                  .WithMessage("Keyword is required")
                  .MaximumLength(Length.Large)
                  .WithMessage($"Keyword max length is { Length.Large }");

            RuleFor(x => x.Label)
                .MaximumLength(Length.Medium)
                .WithMessage($"Label max length is {Length.Medium}");
        }
    }
}
