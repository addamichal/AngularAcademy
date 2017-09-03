namespace ToptalShop.Api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddingSalesOrders : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.SalesOrderLines",
                c => new
                    {
                        SalesOrderLineId = c.Int(nullable: false, identity: true),
                        SalesOrderId = c.Int(nullable: false),
                        ProductId = c.Int(nullable: false),
                        Description = c.String(nullable: false),
                        Quantity = c.Int(nullable: false),
                        UnitPrice = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Price = c.Decimal(nullable: false, precision: 18, scale: 2),
                    })
                .PrimaryKey(t => t.SalesOrderLineId)
                .ForeignKey("dbo.Products", t => t.ProductId, cascadeDelete: true)
                .ForeignKey("dbo.SalesOrders", t => t.SalesOrderId, cascadeDelete: true)
                .Index(t => t.SalesOrderId)
                .Index(t => t.ProductId);
            
            CreateTable(
                "dbo.SalesOrders",
                c => new
                    {
                        SalesOrderId = c.Int(nullable: false, identity: true),
                        Email = c.String(nullable: false),
                        TotalPrice = c.Decimal(nullable: false, precision: 18, scale: 2),
                        CreatedById = c.String(nullable: false, maxLength: 128),
                        Created = c.DateTime(nullable: false),
                        Modified = c.DateTime(nullable: false),
                        ShippingAddressId = c.Int(nullable: false),
                        BillingAddressId = c.Int(nullable: false),
                        PaypalReference = c.String(nullable: false),
                        Status = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.SalesOrderId)
                .ForeignKey("dbo.Addresses", t => t.BillingAddressId, cascadeDelete: true)
                .ForeignKey("dbo.AspNetUsers", t => t.CreatedById, cascadeDelete: true)
                .ForeignKey("dbo.Addresses", t => t.ShippingAddressId, cascadeDelete: true)
                .Index(t => t.CreatedById)
                .Index(t => t.ShippingAddressId)
                .Index(t => t.BillingAddressId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.SalesOrders", "ShippingAddressId", "dbo.Addresses");
            DropForeignKey("dbo.SalesOrderLines", "SalesOrderId", "dbo.SalesOrders");
            DropForeignKey("dbo.SalesOrders", "CreatedById", "dbo.AspNetUsers");
            DropForeignKey("dbo.SalesOrders", "BillingAddressId", "dbo.Addresses");
            DropForeignKey("dbo.SalesOrderLines", "ProductId", "dbo.Products");
            DropIndex("dbo.SalesOrders", new[] { "BillingAddressId" });
            DropIndex("dbo.SalesOrders", new[] { "ShippingAddressId" });
            DropIndex("dbo.SalesOrders", new[] { "CreatedById" });
            DropIndex("dbo.SalesOrderLines", new[] { "ProductId" });
            DropIndex("dbo.SalesOrderLines", new[] { "SalesOrderId" });
            DropTable("dbo.SalesOrders");
            DropTable("dbo.SalesOrderLines");
        }
    }
}
