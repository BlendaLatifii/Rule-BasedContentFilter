using Domain.Constants;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configuration
{
    public class RuleConfiguration : IEntityTypeConfiguration<Rule>
    {
        public void Configure(EntityTypeBuilder<Rule> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Keyword)
                .HasMaxLength(Length.Large)
                .IsRequired(true);

            builder.Property(x => x.Label)
               .HasMaxLength(Length.Medium)
               .IsRequired(false);

            builder.Property(x => x.Color)
              .HasMaxLength(Length.Medium);
        }
    }
}
