namespace Application.DTOs
{
    public class CreateValidationRequestDto
    {
        public string PropertyAddress { get; set; } = "";
        public int PropertyTypeId { get; set; }
        public decimal RequestedValue { get; set; }
        public string? Remarks { get; set; }
    }

}
