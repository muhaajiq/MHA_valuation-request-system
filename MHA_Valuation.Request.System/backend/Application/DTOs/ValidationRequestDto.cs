using Domain;

namespace Application.DTOs
{
    public class ValidationRequestDto
    {
        public int Id { get; set; }
        public string PropertyAddress { get; set; } = string.Empty;
        public string PropertyType { get; set; } = string.Empty;
        public decimal RequestedValue { get; set; }
        public ValidationStatus Status { get; set; }
        public DateTime RequestDate { get; set; }
        public string? Remarks { get; set; }
    }

}
