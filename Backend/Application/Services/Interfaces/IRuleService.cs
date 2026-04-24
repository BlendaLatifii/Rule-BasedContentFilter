using Application.DTO;

namespace Application.Services.Interfaces
{
    public interface IRuleService
    {
        Task AddRuleAsync(AddRuleDto addRuletDto, CancellationToken cancellationToken);
        Task<List<RuleDto>> GetAllRulesAsync(CancellationToken cancellationToken);
        Task<RuleDto> GetRuleByIdAsync(Guid id, CancellationToken cancellationToken);
        Task UpdateRuleAsync(Guid id, UpdateRuleDto updateRuleDto, CancellationToken cancellationToken);
        Task DeleteRuleAsync(Guid id, CancellationToken cancellationToken);
        Task<List<MatchedTextDto>> ProcessTextAsync(TextDto textDto, CancellationToken cancellationToken);
    }
}
