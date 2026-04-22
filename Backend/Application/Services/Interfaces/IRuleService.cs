using Application.DTO;

namespace Application.Services.Interfaces
{
    public interface IRuleService
    {
        Task AddRule(AddRuleDto addRuletDto);
        Task<List<RuleDto>> GetAllRules();
        Task<RuleDto> GetRuleById(Guid id);
        Task UpdateRule(Guid id, UpdateRuleDto updateRuleDto);
        Task DeleteRule(Guid id);
    }
}
