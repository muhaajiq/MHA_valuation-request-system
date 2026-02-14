using Domain;

namespace Application
{
    public static class StatusRules
    {
        public static bool IsValidTransition(ValidationStatus current, ValidationStatus next)
        {
            return (current, next) switch
            {
                (ValidationStatus.Draft, ValidationStatus.Submitted) => true,
                (ValidationStatus.Submitted, ValidationStatus.InProgress) => true,
                _ => false
            };
        }
    }

}
