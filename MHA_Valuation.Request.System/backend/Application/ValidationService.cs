using Application.DTOs;
using AutoMapper;
using Domain;
using Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Application
{
    public class ValidationService
    {
        private readonly AppDbContext _db;
        private readonly IMapper _mapper;

        public ValidationService(AppDbContext db, IMapper mapper )
        {
            _db = db;
            _mapper = mapper;
        }

        // Get
        public async Task<List<PropertyType>> GetActivePropertyTypes()
        {
            var activeTypes = await _db.PropertyTypes
                .Where(pt => pt.IsActive)
                .ToListAsync();

            return _mapper.Map<List<PropertyType>>(activeTypes);
        }

        public async Task<List<ValidationRequestDto>> GetAll()
        {
            var data = await _db.ValidationRequests.Include(x => x.PropertyType).ToListAsync();
            return _mapper.Map<List<ValidationRequestDto>>(data);
        }

        public async Task<ValidationRequestDto?> GetById(int id)
        {
            var entity = await _db.ValidationRequests
                .Include(x => x.PropertyType)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (entity == null)
                return null;

            return _mapper.Map<ValidationRequestDto>(entity);
        }

        // Create
        public async Task<ValidationRequestDto> Create(CreateValidationRequestDto dto)
        {
            var entity = new ValidationRequest
            {
                PropertyAddress = dto.PropertyAddress,
                PropertyTypeId = dto.PropertyTypeId,
                RequestedValue = dto.RequestedValue,
                Remarks = dto.Remarks,
                Status = ValidationStatus.Draft,
                RequestDate = DateTime.UtcNow
            };

            _db.Add(entity);
            await _db.SaveChangesAsync();

            return _mapper.Map<ValidationRequestDto>(entity);
        }

        // Update
        public async Task<bool> UpdateStatus(int id, ValidationStatus next)
        {
            var entity = await _db.ValidationRequests.FindAsync(id);

            if (entity == null)
                return false;

            if (!IsValidTransition(entity.Status, next))
                throw new InvalidOperationException("Invalid status transition");

            entity.Status = next;

            await _db.SaveChangesAsync();
            return true;
        }

        // Helper
        private static bool IsValidTransition(ValidationStatus current, ValidationStatus next)
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
