using Application.DTO;
using Application.Projections;
using Application.Services.Interfaces;
using Domain.Exceptions;
using Infrastructure.Data;
using Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace Application.Services
{
    public class RuleService : IRuleService
    {

        private readonly IRuleRepository _ruleRepository;

        public RuleService(IRuleRepository ruleRepository, AppDbContext db)
        {
            _ruleRepository = ruleRepository;
        }

        public async Task AddRuleAsync(AddRuleDto addRuletDto, CancellationToken cancellationToken)
        {
            var rule = addRuletDto.MapToRuleEntity();

            await _ruleRepository.AddAsync(rule, cancellationToken);
        }

        private async Task<List<Domain.Entities.Rule>> GetRelevantEnabledRulesToTextAsync(string text, CancellationToken cancellationToken)
        {
            var rules = await _ruleRepository.Query()
                .Where(rule => rule.IsEnable && text.Contains(rule.Keyword))
                .OrderByDescending(r => r.Priority)
                .ToListAsync(cancellationToken);

            return rules;
        }

        public async Task<List<RuleDto>> GetAllRulesAsync(CancellationToken cancellationToken)
        {
            var rules = await _ruleRepository.GetAllAsync(cancellationToken);

            var model = rules.Select(rule => rule.MapToRuleDto()).ToList();

            return model;
        }

        public async Task<RuleDto> GetRuleByIdAsync(Guid id, CancellationToken cancellationToken)
        {
            var rule = await _ruleRepository.GetByIdAsync(id, cancellationToken);

            if (rule == null)
            {
                throw new AppNotFoundedException();
            }

            var model = rule.MapToRuleDto();

            return model;
        }

        public async Task UpdateRuleAsync(Guid id, UpdateRuleDto updateRuleDto, CancellationToken cancellationToken)
        {
            var rule = await _ruleRepository.GetByIdAsync(id, cancellationToken);

            if (rule == null)
            {
                throw new AppNotFoundedException();
            }

            rule.UpdateRuleFromDto(updateRuleDto);

            await _ruleRepository.UpdateAsync(rule, cancellationToken);
        }

        public async Task DeleteRuleAsync(Guid id, CancellationToken cancellationToken)
        {
            var rule = await _ruleRepository.GetByIdAsync(id, cancellationToken);

            if (rule == null)
            {
                throw new AppNotFoundedException(); ;
            }

            await _ruleRepository.DeleteAsync(rule, cancellationToken);
        }


        public async Task<List<MatchedTextDto>> ProcessTextAsync(TextDto textDto, CancellationToken cancellationToken)
        {
            var result = new List<MatchedTextDto>();

            var words = textDto.Text.Split(' ', StringSplitOptions.RemoveEmptyEntries);

            var rules = await GetRelevantEnabledRulesToTextAsync(textDto.Text,cancellationToken);

            for (int i = 0; i < words.Length; i++)
            {

                var match = rules.Where(r => r.Matched(words[i])).OrderBy(r => r.Priority).FirstOrDefault();

                if (match is not null)
                {
                    result.Add(match.MapToMatchedTextDto(i));
                }
            }

            return result;
        }

    }
}
