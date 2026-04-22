using Application.Services;
using Application.Services.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace Application
{
    public static class DependencyInjection
    {
        public static async void AddApplication(this IServiceCollection services)
        {
            services.AddScoped<IRuleService, RuleService>();
        }
    }
}
