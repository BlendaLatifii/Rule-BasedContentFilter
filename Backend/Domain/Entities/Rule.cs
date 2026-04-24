using Domain.Enums;

namespace Domain.Entities
{
    public class Rule
    {
        public Guid Id { get; set; }
        public string Keyword { get; set; } = string.Empty;
        public MatchTypes MatchType { get; set; }
        public ActionType Action {  get; set; }
        public string? Color  { get; set; } 
        public string? Label { get; set; }
        public bool IsEnable { get; set; }
        public RulePriority Priority { get; set; }

        public bool Matched(string textWord)
        {
            return MatchType switch
            {
                MatchTypes.Exact =>
                    textWord.Equals(Keyword, StringComparison.OrdinalIgnoreCase),

                MatchTypes.StartsWith =>
                    textWord.StartsWith(Keyword, StringComparison.OrdinalIgnoreCase),

                MatchTypes.Contains =>
                    textWord.Contains(Keyword, StringComparison.OrdinalIgnoreCase),

                _ => false
            };
        }
    }
}
