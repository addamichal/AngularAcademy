using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using Microsoft.AspNet.Identity.EntityFramework;
using ToptalShop.Api.Models;

namespace ToptalShop.Api.DataLayer
{
    public class ToptalShopDbContext : IdentityDbContext<ApplicationUser>
    {
        public ToptalShopDbContext()
            : base("ToptalShopDbContext", throwIfV1Schema: false)
        {
            this.Configuration.LazyLoadingEnabled = false;
        }

        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        public static ToptalShopDbContext Create()
        {
            return new ToptalShopDbContext();
        }
    }
}