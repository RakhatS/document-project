using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using DocumentProject.WebAPI.Data;

namespace DocumentProject.WebAPI.Helpers
{
    public class ApplicationDbContext : IdentityDbContext<IdentityUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
           : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Organization>()
              .HasMany(s => s.Applications).WithOne(a => a.Organization).HasForeignKey(a => a.OrganizationId);

            modelBuilder.Entity<Organization>()
              .HasMany(s => s.Members).WithOne(a => a.Organization).HasForeignKey(a => a.OrganizationId);

            modelBuilder.Entity<Manager>()
              .HasMany(s => s.Organizations).WithOne(a => a.OwnerManager).HasForeignKey(a => a.OwnerManagerId);

            modelBuilder.Entity<Member>()
              .HasMany(s => s.Applications).WithOne(a => a.Member).HasForeignKey(a => a.MemberId);


            modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
        }


        public DbSet<Application> Applications { get; set; }
        public DbSet<Manager> Managers { get; set; }
        public DbSet<Member> Members { get; set; }
        public DbSet<Organization> Organizations { get; set; }
    }
}
