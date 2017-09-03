using ToptalShop.Api.DataLayer;

namespace ToptalShop.Api.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<ToptalShop.Api.DataLayer.ToptalShopDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(ToptalShop.Api.DataLayer.ToptalShopDbContext context)
        {
            context.Products.AddOrUpdate(new Product() { ProductId = 1, Name = "Product 1", Description = "Product 1 Description", Price = 10m });
            context.Products.AddOrUpdate(new Product() { ProductId = 2, Name = "Product 2", Description = "Product 2 Description", Price = 15m, });
            context.Products.AddOrUpdate(new Product() { ProductId = 3, Name = "Product 3", Description = "Product 3 Description", Price = 20m });

            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //
        }
    }
}
