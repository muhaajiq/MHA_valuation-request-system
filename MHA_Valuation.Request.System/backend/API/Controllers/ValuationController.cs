using Application;
using Application.DTOs;
using Domain;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/valuation-requests")]
    public class ValuationController : ControllerBase
    {
        private readonly ValidationService _service;

        public ValuationController(ValidationService service)
        {
            _service = service;
        }

        // /api/valuation-requests
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var data = await _service.GetAll();
            return Ok(data);
        }

        // /api/valuation-requests/{id}
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var item = await _service.GetById(id);

            if (item == null)
                return NotFound(new { message = "Valuation request not found" });

            return Ok(item);
        }

        // /api/valuation-requests
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateValidationRequestDto dto)
        {
            try
            {
                var created = await _service.Create(dto);

                return CreatedAtAction(
                    nameof(GetById),
                    new { id = created.Id },
                    created
                );
            }
            catch (ValidationException ex)
            {
                return BadRequest(new { errors = ex.Errors.Select(e => e.ErrorMessage) });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Unexpected server error", detail = ex.Message });
            }
        }

        // /api/valuation-requests/{id}/status
        [HttpPut("{id:int}/status")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] ValidationStatus status)
        {
            try
            {
                var updated = await _service.UpdateStatus(id, status);

                if (!updated)
                    return NotFound(new { message = "Valuation request not found" });

                return NoContent();
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new { message = ex.Message });
            }
        }
    }
}
