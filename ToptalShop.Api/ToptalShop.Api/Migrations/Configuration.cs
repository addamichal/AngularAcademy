using System.Collections.Generic;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using ToptalShop.Api.DataLayer;
using ToptalShop.Api.Engines;

namespace ToptalShop.Api.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<ToptalShop.Api.DataLayer.ToptalShopDbContext>
    {
        public static int counter = 1;

        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(ToptalShop.Api.DataLayer.ToptalShopDbContext context)
        {
            GlobalMapper.Initialize();

            //create products
            var product1 = new Product() { ProductId = 1, Name = "Product 1", Description = "Product 1 Description", Price = 10m };
            var product2 = new Product() { ProductId = 2, Name = "Product 2", Description = "Product 2 Description", Price = 15m, };
            var product3 = new Product() { ProductId = 3, Name = "Product 3", Description = "Product 3 Description", Price = 20m };

            context.Products.AddOrUpdate(product1);
            context.Products.AddOrUpdate(product2);
            context.Products.AddOrUpdate(product3);

            //create roles
            var applicationRoleManager = new ApplicationRoleManager(new RoleStore<IdentityRole>(context));
            var adminRole = applicationRoleManager.CreateAsync(new IdentityRole("Admin")).Result;
            var managerRole = applicationRoleManager.CreateAsync(new IdentityRole("Manager")).Result;
            var regularUserRole = applicationRoleManager.CreateAsync(new IdentityRole("RegularUser")).Result;

            //create users
            var applicationUserManager = new ApplicationUserManager(new UserStore<ApplicationUser>(context));

            var userEngine = new UserEngine(applicationUserManager, applicationRoleManager, context);
            var regularUser = CreateUser(userEngine, new EditToptalShopAppUser()
            {
                Email = "regularuser@toptalshop.com",
                Password = "regularuser",
                ConfirmPassword = "regularuser",
                UserRole = ToptalShopAppUserRole.RegularUser
            });
            userEngine.CreateUser(new EditToptalShopAppUser() { Email = "manager@toptalshop.com", Password = "manager", ConfirmPassword = "manager", UserRole = ToptalShopAppUserRole.Manager });
            userEngine.CreateUser(new EditToptalShopAppUser() { Email = "administrator@toptalshop.com", Password = "administrator", ConfirmPassword = "administrator", UserRole = ToptalShopAppUserRole.Admin });


            //create orders
            var order1 = GetOrder(regularUser, product1);
            var order2 = GetOrder(regularUser, product2);
            var order3 = GetOrder(regularUser, product3);
            CreateOrder(context, order1);
            CreateOrder(context, order2);
            CreateOrder(context, order3);
        }

        private static SalesOrder GetOrder(ToptalShopAppUser regularUser, Product product1)
        {
            var order = new SalesOrder()
            {
                SalesOrderId = counter,
                Email = regularUser.Email,
                CreatedById = regularUser.Id,
                TotalPrice = 10,
                Status = SalesOrderStatus.Paid,
                Lines = new List<SalesOrderLine>()
                {
                    new SalesOrderLine()
                    {
                        ProductId = product1.ProductId,
                        Description = product1.Description,
                        Price = product1.Price,
                        UnitPrice = product1.Price,
                        Quantity = 1,
                    }
                },
                BillingAddress = new Address()
                {
                    FirstName = "Joseph",
                    LastName = "Jackson",
                    Address1 = "4814 Berkley Street",
                    Address2 = "4814",
                    City = "Saxapahaw",
                    State = "North Carolina",
                    Zip = "27340"
                },
                ShippingAddress = new Address()
                {
                    FirstName = "Joseph",
                    LastName = "Jackson",
                    Address1 = "4814 Berkley Street",
                    Address2 = "4814",
                    City = "Saxapahaw",
                    State = "North Carolina",
                    Zip = "27340"
                },
                PaypalReference = "PP-0000" + counter
            };
            return order;
        }

        private static void CreateOrder(ToptalShopDbContext context, SalesOrder order)
        {
            if (context.SalesOrders.SingleOrDefault(w => w.SalesOrderId == order.SalesOrderId) == null)
            {
                context.SalesOrders.AddOrUpdate(order);
            }
        }

        private static ToptalShopAppUser CreateUser(UserEngine userEngine, EditToptalShopAppUser user)
        {
            userEngine.CreateUser(user);
            var regularUser = userEngine.FindByEmail(user.Email);
            return regularUser;
        }
    }
}
