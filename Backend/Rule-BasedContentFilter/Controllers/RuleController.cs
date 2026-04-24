using Application.DTO;
using Application.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Rule_BasedContentFilter.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RuleController : ControllerBase
    {
        private readonly IRuleService _ruleService;

        public RuleController(IRuleService ruleService)
        {
            _ruleService = ruleService;
        }

        [HttpPost]
        public async Task<ActionResult> AddRuleAsync(AddRuleDto addRuleDto,CancellationToken cancellationToken)
        {
            await _ruleService.AddRuleAsync(addRuleDto,cancellationToken);

            return Ok();
        }

        [HttpGet]
        public async Task<ActionResult<List<RuleDto>>> GetAllRulesAsync(CancellationToken cancellationToken)
        {
            var result = await _ruleService.GetAllRulesAsync(cancellationToken);

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<RuleDto>> GetRuleByIdAsync(Guid id, CancellationToken cancellationToken)
        {
            var result = await _ruleService.GetRuleByIdAsync(id,cancellationToken);

            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateRule(Guid id, UpdateRuleDto updateRuleDto, CancellationToken cancellationToken)
        {
            await _ruleService.UpdateRuleAsync(id, updateRuleDto,cancellationToken);

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteRuleAsync(Guid id, CancellationToken cancellationToken)
        {
            await _ruleService.DeleteRuleAsync(id, cancellationToken);

            return Ok();
        }

        [HttpPost("[action]")]
        public async Task<ActionResult<List<MatchedTextDto>>> ProcessTextAsync([FromBody] TextDto textDto, CancellationToken cancellationToken)
        {
            var result = await _ruleService.ProcessTextAsync(textDto, cancellationToken);

            return result;
        }
    }
}
