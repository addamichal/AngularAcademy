using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
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
        public DbSet<Address> Addresses { get; set; }
        public DbSet<SalesOrder> SalesOrders { get; set; }
        public DbSet<SalesOrderLine> SalesOrderLines { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Conventions.Remove<OneToManyCascadeDeleteConvention>();
            modelBuilder.Conventions.Remove<ManyToManyCascadeDeleteConvention>();
        }

        public static ToptalShopDbContext Create()
        {
            return new ToptalShopDbContext();
        }
    }

    public class SalesOrder
    {
        public int SalesOrderId { get; set; }
        [Required]
        public string Email { get; set; }
        public decimal TotalPrice { get; set; }
        [Required]
        public string CreatedById { get; set; }
        public DateTime Created { get; set; }
        public DateTime Modified { get; set; }
        public int ShippingAddressId { get; set; }
        public int BillingAddressId { get; set; }
        [Required]
        public string PaypalReference { get; set; }

        public List<SalesOrderLine> Lines { get; set; }
        public SalesOrderStatus Status { get; set; }

        //foreign keys
        [ForeignKey(nameof(CreatedById))]
        public ApplicationUser CreatedBy { get; set; }
        [ForeignKey(nameof(BillingAddressId))]
        public virtual Address BillingAddress { get; set; }
        [ForeignKey(nameof(ShippingAddressId))]
        public virtual Address ShippingAddress { get; set; }

        public SalesOrder()
        {
            Status = SalesOrderStatus.Opened;
            Lines = new List<SalesOrderLine>();
            Created = DateTime.Now;
            Modified = DateTime.Now;
        }
    }

    public class SalesOrderLine
    {
        public int SalesOrderLineId { get; set; }
        public int SalesOrderId { get; set; }
        public int ProductId { get; set; }
        [Required]
        public string Description { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal Price { get; set; }

        [ForeignKey(nameof(ProductId))]
        public virtual Product Product { get; set; }
        [ForeignKey(nameof(SalesOrderId))]
        public virtual SalesOrder SalesOrder { get; set; }
    }

    public enum SalesOrderStatus
    {
        Opened = 1,
        Paid,
        Processed,
        Finished,
        Refunded,
        Cancelled
    }
}