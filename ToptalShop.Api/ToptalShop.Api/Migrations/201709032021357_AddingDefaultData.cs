namespace ToptalShop.Api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddingDefaultData : DbMigration
    {
        public override void Up()
        {
            Sql("INSERT [dbo].[AspNetRoles] ([Id], [Name]) VALUES (N'c4a48aa1-eaf0-43cf-9044-0844399e5e96', N'Admin')");
            Sql("INSERT [dbo].[AspNetRoles] ([Id], [Name]) VALUES (N'7d8afbfb-dfa5-41e3-ad64-f7f9e28e9857', N'UserManager')");
            Sql("INSERT [dbo].[AspNetRoles] ([Id], [Name]) VALUES (N'34152373-4254-442f-a1b2-a9604176f8e1', N'RegularUser')");

            Sql(@"INSERT [dbo].[AspNetUsers] ([Id], [Email], [EmailConfirmed], [PasswordHash], [SecurityStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEndDateUtc], [LockoutEnabled], [AccessFailedCount], [UserName]) VALUES (N'2341bca8-6a48-45c0-8a2a-4038174a5ef6', N'usermanager@toptalshop.com', 0, N'ANP++OGr5knA9BoXnZ8dJk9dmpQYiNAzEudO2SBY+45Yv13wTBPl6LVWBti/PUBnJQ==', N'ff8feecc-606b-42d8-aee3-0a9d38b5ea64', NULL, 0, 0, NULL, 0, 0, N'usermanager@toptalshop.com')");
            Sql(@"INSERT [dbo].[AspNetUsers] ([Id], [Email], [EmailConfirmed], [PasswordHash], [SecurityStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEndDateUtc], [LockoutEnabled], [AccessFailedCount], [UserName]) VALUES (N'3382160c-e170-48fc-bbe2-50bc289b1401', N'administrator@toptalshop.com', 0, N'AKb1/3xL8aVj8Fx1QirWf0XU6vOt6T1XkNrQPeY3E5XQshIkWMpnAuJ9kM8EqVRpkA==', N'6b4da865-76c3-4d74-9182-cbb27b06339a', NULL, 0, 0, NULL, 0, 0, N'administrator@toptalshop.com')");
            Sql(@"INSERT [dbo].[AspNetUsers] ([Id], [Email], [EmailConfirmed], [PasswordHash], [SecurityStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEndDateUtc], [LockoutEnabled], [AccessFailedCount], [UserName]) VALUES (N'f29f03a0-6f58-49e0-8844-5a883eecee53', N'regularuser@toptalshop.com', 0, N'ACcF1Gdz27TlujfQYAq4rnl2KfOqd6oSicQdLaMBc44IeKV8TBnrEo0pmbgMhczERg==', N'd862a5c2-fc5a-47a4-8797-0aba9f20f266', NULL, 0, 0, NULL, 0, 0, N'regularuser@toptalshop.com')");

            Sql("INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'2341bca8-6a48-45c0-8a2a-4038174a5ef6', N'7d8afbfb-dfa5-41e3-ad64-f7f9e28e9857')");
            Sql("INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'3382160c-e170-48fc-bbe2-50bc289b1401', N'c4a48aa1-eaf0-43cf-9044-0844399e5e96')");
            Sql("INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'f29f03a0-6f58-49e0-8844-5a883eecee53', N'34152373-4254-442f-a1b2-a9604176f8e1')");
        }
        
        public override void Down()
        {
        }
    }
}
