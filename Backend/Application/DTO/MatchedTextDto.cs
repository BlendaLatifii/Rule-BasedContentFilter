using Domain.Enums;

namespace Application.DTO
{
    public class MatchedTextDto
    {
        public int WordIndex { get; set; }
        public string? Color { get; set; }
        public string? Label { get; set; }
        public ActionType Action { get; set; }
    }
}
