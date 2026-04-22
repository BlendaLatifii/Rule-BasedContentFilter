using Application.DTO;
using Application.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Rule_BasedContentFilter.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RuleController : ControllerBase
    {
        private readonly IRuleService _ruleService;

        public RuleController(IRuleService ruleService)
        {
            _ruleService = ruleService;
        }

        [HttpPost]
        public async Task<ActionResult> AddRule(AddRuleDto addRuleDto)
        {
            await _ruleService.AddRule(addRuleDto);

            return Ok();
        }

        [HttpGet]
        public async Task<ActionResult<List<RuleDto>>> GetAllRules()
        {
            var result = await _ruleService.GetAllRules();

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<RuleDto>> GetRuleById(Guid id)
        {
            var result = await _ruleService.GetRuleById(id);

            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateRule(Guid id, UpdateRuleDto updateRuleDto)
        {
            await _ruleService.UpdateRule(id, updateRuleDto);

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteRule(Guid id)
        {
            await _ruleService.DeleteRule(id);

            return Ok();
        }
    }
}
