namespace ToptalShop.Api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddingAddresses : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Addresses",
                c => new
                    {
                        AddressId = c.Int(nullable: false, identity: true),
                        FirstName = c.String(nullable: false),
                        LastName = c.String(nullable: false),
                        Address1 = c.String(nullable: false),
                        Address2 = c.String(nullable: false),
                        City = c.String(nullable: false),
                        State = c.String(nullable: false),
                        Zip = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.AddressId);
            
            AddColumn("dbo.AspNetUsers", "ShippingAddressId", c => c.Int());
            AddColumn("dbo.AspNetUsers", "BillingAddressId", c => c.Int());
            CreateIndex("dbo.AspNetUsers", "ShippingAddressId");
            CreateIndex("dbo.AspNetUsers", "BillingAddressId");
            AddForeignKey("dbo.AspNetUsers", "BillingAddressId", "dbo.Addresses", "AddressId");
            AddForeignKey("dbo.AspNetUsers", "ShippingAddressId", "dbo.Addresses", "AddressId");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.AspNetUsers", "ShippingAddressId", "dbo.Addresses");
            DropForeignKey("dbo.AspNetUsers", "BillingAddressId", "dbo.Addresses");
            DropIndex("dbo.AspNetUsers", new[] { "BillingAddressId" });
            DropIndex("dbo.AspNetUsers", new[] { "ShippingAddressId" });
            DropColumn("dbo.AspNetUsers", "BillingAddressId");
            DropColumn("dbo.AspNetUsers", "ShippingAddressId");
            DropTable("dbo.Addresses");
        }
    }
}
