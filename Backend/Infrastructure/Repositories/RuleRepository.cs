using Domain.Entities;
using Infrastructure.Data;
using Infrastructure.Repositories.Interfaces;

namespace Infrastructure.Repositories
{
    public class RuleRepository : GenericRepository<Rule>, IRuleRepository
    {
        public RuleRepository(AppDbContext context) : base(context)
        {
        }
    }
}
