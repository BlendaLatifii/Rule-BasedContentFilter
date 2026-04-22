using Application.DTO;
using Application.Services.Interfaces;
using Domain.Entities;
using Infrastructure.Repositories.Interfaces;

namespace Application.Services
{
    public class RuleService : IRuleService
    {

        private readonly IRuleRepository _ruleRepository;

        public RuleService(IRuleRepository ruleRepository)
        {
            _ruleRepository = ruleRepository;
        }

        public async Task AddRule(AddRuleDto addRuletDto)
        {
            var rule = MapToRuleEntity(addRuletDto);

            await _ruleRepository.AddAsync(rule, CancellationToken.None);
        }

        public async Task<List<RuleDto>> GetAllRules()
        {
            var rules = await _ruleRepository.GetAllAsync(CancellationToken.None);

            var model = rules.Select(rule => MapToRuleDto(rule)).ToList();

            return model;
        }

        public async Task<RuleDto> GetRuleById(Guid id)
        {
            var rule = await _ruleRepository.GetByIdAsync(id, CancellationToken.None);
            if (rule == null)
            {
                throw new Exception("Rule not found");
            }

            var model = MapToRuleDto(rule);

            return model;
        }

        public async Task UpdateRule(Guid id, UpdateRuleDto updateRuleDto)
        {
            var rule = await _ruleRepository.GetByIdAsync(id, CancellationToken.None);
            if (rule == null)
            {
                throw new Exception("Rule not found");
            }

            rule = MapUpdateRule(rule, updateRuleDto);

            await _ruleRepository.UpdateAsync(rule, CancellationToken.None);
        }

        public async Task DeleteRule(Guid id)
        {
            var rule = await _ruleRepository.GetByIdAsync(id, CancellationToken.None);
            if (rule == null)
            {
                throw new Exception("Rule not found");
            }

            await _ruleRepository.DeleteAsync(rule, CancellationToken.None);
        }

        private Rule MapToRuleEntity(AddRuleDto addRuleDto)
        {
            return new Rule
            {
                Keyword = addRuleDto.Keyword,
                MatchType = addRuleDto.MatchType,
                Action = addRuleDto.Action,
                Color = addRuleDto.Color
            };
        }

        private RuleDto MapToRuleDto (Rule rule)
        {
            return new RuleDto
            {
                Id = rule.Id,
                Keyword = rule.Keyword,
                MatchType = rule.MatchType,
                Action = rule.Action,
                Color = rule.Color
            };
        }

        private Rule MapUpdateRule(Rule rule, UpdateRuleDto updateRuleDto)
        {
            rule.Keyword = updateRuleDto.Keyword ?? rule.Keyword;
            rule.MatchType = updateRuleDto.MatchType ?? rule.MatchType;
            rule.Action = updateRuleDto.Action ?? rule.Action;
            rule.Color = updateRuleDto.Color ?? rule.Color;

            return rule;
        }

    }
}
