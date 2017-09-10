using System.Collections.Generic;
using AutoMapper;
using Bogus;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Newtonsoft.Json;
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
        private UserEngine userEngine;
        private ToptalShopDbContext ctx;

        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(ToptalShop.Api.DataLayer.ToptalShopDbContext context)
        {
            this.ctx = context;
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

            userEngine = new UserEngine(applicationUserManager, applicationRoleManager, context);
            CreateUser(new EditToptalShopAppUser()
            {
                Email = "regularuser@toptalshop.com",
                Password = "regularuser",
                ConfirmPassword = "regularuser",
                UserRole = ToptalShopAppUserRole.RegularUser
            });

            userEngine.CreateUser(new EditToptalShopAppUser() { Email = "manager@toptalshop.com", Password = "manager", ConfirmPassword = "manager", UserRole = ToptalShopAppUserRole.Manager });
            userEngine.CreateUser(new EditToptalShopAppUser() { Email = "administrator@toptalshop.com", Password = "administrator", ConfirmPassword = "administrator", UserRole = ToptalShopAppUserRole.Admin });


            if (!ctx.SalesOrders.Any())
            {
                var random = new Random();
                var products = ctx.Products.ToList();
                for (int i = 0; i < 10; i++)
                {
                    var randomProductIndex = random.Next(0, products.Count);
                    CreateOrder(products[randomProductIndex]);
                }
            }
        }

        private SalesOrder CreateOrder(Product product1)
        {
            var faker = new Faker();
            var address = new Address();
            address.FirstName = faker.Name.FirstName();
            address.LastName = faker.Name.FirstName();
            address.Address1 = faker.Address.StreetAddress();
            address.Address2 = faker.Address.SecondaryAddress();
            address.City = faker.Address.City();
            address.State = faker.Address.State();
            address.Zip = faker.Address.ZipCode();

            var createdUser = CreateFakeUser(address);

            var order = new SalesOrder()
            {
                Email = createdUser.Email,
                CreatedById = createdUser.Id,
                TotalPrice = product1.Price,
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
                BillingAddress = Clone(address),
                ShippingAddress = Clone(address),
                PaypalReference = "PP-0000" + counter
            };

            ctx.SalesOrders.AddOrUpdate(order);

            return order;
        }

        private ApplicationUser CreateFakeUser(Address address)
        {
            var faker = new Faker();

            var user = new EditToptalShopAppUser();
            user.Email = faker.Internet.Email(address.FirstName, address.LastName);
            user.Password = faker.Internet.Password();
            user.ConfirmPassword = user.Password;
            user.UserRole = ToptalShopAppUserRole.RegularUser;

            var createdUser = CreateUser(user);
            var updatedUser = ctx.Users.SingleOrDefault(w => w.Id == createdUser.Id);
            updatedUser.ShippingAddress = Clone(address);
            updatedUser.BillingAddress = Clone(address);
            ctx.Users.AddOrUpdate(updatedUser);
            return updatedUser;
        }

        private ToptalShopAppUser CreateUser(EditToptalShopAppUser user)
        {
            userEngine.CreateUser(user);
            var regularUser = userEngine.FindByEmail(user.Email);
            return regularUser;
        }

        public static T Clone<T>(T source)
        {
            var serialized = JsonConvert.SerializeObject(source);
            return JsonConvert.DeserializeObject<T>(serialized);
        }
    }
}
