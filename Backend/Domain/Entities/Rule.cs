using Domain.Enums;

namespace Domain.Entities
{
    public class Rule
    {
        public Guid Id { get; set; }
        public string Keyword { get; set; } = string.Empty;
        public MatchTypes MatchType { get; set; }
        public ActionType Action {  get; set; }
        public string Color  { get; set; }  = string.Empty;
    }
}
