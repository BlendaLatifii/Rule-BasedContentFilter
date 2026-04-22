using Domain.Enums;

namespace Application.DTO
{
    public class UpdateRuleDto
    {
        public string? Keyword { get; set; }
        public MatchTypes? MatchType { get; set; }
        public ActionType? Action { get; set; }
        public string? Color { get; set; }
    }
}
