namespace Domain
{
    public class ValidationRequest
    {
        public int Id { get; set; }
        public string PropertyAddress { get; set; } = "";
        public int PropertyTypeId { get; set; }
        public decimal RequestedValue { get; set; }
        public ValidationStatus Status { get; set; }
        public DateTime RequestDate { get; set; }
        public string? Remarks { get; set; }

        public PropertyType? PropertyType { get; set; }
    }
}
