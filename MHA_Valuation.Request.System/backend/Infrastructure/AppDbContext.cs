using Domain;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure
{
    public class AppDbContext : DbContext
    {
        public DbSet<PropertyType> PropertyTypes => Set<PropertyType>();
        public DbSet<ValidationRequest> ValidationRequests => Set<ValidationRequest>();

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    }
}
