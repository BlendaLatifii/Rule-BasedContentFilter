using Application.DTO;
using Domain.Entities;

namespace Application.Services.Interfaces
{
    public interface IWordProcessor
    {
        List<MatchedTextDto> Process(Rule rule, string text);
    }
}
