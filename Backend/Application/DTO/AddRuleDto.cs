using Domain.Enums;

namespace Application.DTO
{
    public class AddRuleDto
    {
        public string Keyword { get; set; } = null!;
        public MatchTypes MatchType { get; set; } = MatchTypes.Contains;
        public ActionType Action { get; set; } = ActionType.ToolTip;
        public string Color { get; set; } = null!;
    }
}
