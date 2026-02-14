using Application;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/property-types")]
    public class PropertyTypesController : ControllerBase
    {
        private readonly ValidationService _service;

        public PropertyTypesController(ValidationService service)
        {
            _service = service;
        }

        // /api/property-types
        [HttpGet]
        public async Task<IActionResult> GetActive()
        {
            var result = await _service.GetActivePropertyTypes();
            return Ok(result);
        }
    }

}
