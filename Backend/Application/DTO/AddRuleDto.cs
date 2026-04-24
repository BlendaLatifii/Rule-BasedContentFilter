using Domain.Enums;

namespace Application.DTO
{
    public class AddRuleDto
    {
        public string Keyword { get; set; } = null!;
        public MatchTypes MatchType { get; set; } = MatchTypes.Contains;
        public ActionType Action { get; set; } = ActionType.Highlight;
        public string? Color { get; set; }
        public string? Label { get; set; } 
        public bool IsEnable { get; set; }
        public RulePriority Priority { get; set; } = RulePriority.High;
    }
}
