using Application.DTO;
using Domain.Entities;

namespace Application.Projections
{
    public static class RuleProjection
    {
        public static Rule MapToRuleEntity(this AddRuleDto addRuleDto)
        {
            return new Rule
            {
                Keyword = addRuleDto.Keyword,
                MatchType = addRuleDto.MatchType,
                Action = addRuleDto.Action,
                Color = addRuleDto.Color,
                Label = addRuleDto.Label,
                IsEnable = addRuleDto.IsEnable,
                Priority = addRuleDto.Priority,
            };
        }

        public static RuleDto MapToRuleDto(this Rule rule)
        {
            return new RuleDto
            {
                Id = rule.Id,
                Keyword = rule.Keyword,
                MatchType = rule.MatchType,
                Action = rule.Action,
                Color = rule.Color,
                Label = rule.Label,
                IsEnable = rule.IsEnable,
                Priority = rule.Priority,
            };
        }

        public static MatchedTextDto MapToMatchedTextDto(this Rule rule, int wordIndex)
        {
            return new MatchedTextDto
            {
                WordIndex = wordIndex,
                Color = rule.Color,
                Label = rule.Label,
                Action = rule.Action
            };
        }

        public static void UpdateRuleFromDto(this Rule rule, UpdateRuleDto updateRuleDto)
        {
            rule.Keyword = updateRuleDto.Keyword ?? rule.Keyword;
            rule.MatchType = updateRuleDto.MatchType ?? rule.MatchType;
            rule.Action = updateRuleDto.Action ?? rule.Action;
            rule.Color = updateRuleDto.Color ?? rule.Color;
            rule.Label = updateRuleDto.Label ?? rule.Label;
            rule.IsEnable = updateRuleDto.IsEnable ?? rule.IsEnable;
            rule.Priority = updateRuleDto.Priority ?? rule.Priority;
        }
    }
}
