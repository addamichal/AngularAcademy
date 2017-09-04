using System.Web.Configuration;
using AutoMapper;
using ToptalShop.Api.DataLayer;
using ToptalShop.Api.Models;

namespace ToptalShop.Api
{
    public class GlobalMapper
    {
        public static void Initialize()
        {
            Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<AddUserBindingModel, EditToptalShopAppUser>();

                cfg.CreateMap<UpdateUserBindingModel, EditToptalShopAppUser>();
                cfg.CreateMap<AddressBindingModel, EditAddress>();

                cfg.CreateMap<AddProfileBindingModel, EditToptalShopAppUser>()
                    .ForMember(w => w.UserRole, x => x.Ignore());

                cfg.CreateMap<UpdateProfileBindingModel, EditToptalShopAppUser>()
                    .ForMember(w => w.UserRole, x => x.Ignore());

                cfg.CreateMap<Address, ToptalShopAddUserAddress>();
                cfg.CreateMap<ApplicationUser, ToptalShopAppUser>()
                    .ForMember(w => w.UserRole, x => x.Ignore());

                cfg.CreateMap<EditAddress, Address>();
                cfg.CreateMap<EditToptalShopAppUser, ApplicationUser>()
                    .ForMember(w => w.UserName, x => x.MapFrom(z => z.Email))
                    .ForMember(w => w.EmailConfirmed, x => x.Ignore())
                    .ForMember(w => w.PasswordHash, x => x.Ignore())
                    .ForMember(w => w.SecurityStamp, x => x.Ignore())
                    .ForMember(w => w.PhoneNumber, x => x.Ignore())
                    .ForMember(w => w.PhoneNumberConfirmed, x => x.Ignore())
                    .ForMember(w => w.TwoFactorEnabled, x => x.Ignore())
                    .ForMember(w => w.LockoutEndDateUtc, x => x.Ignore())
                    .ForMember(w => w.LockoutEnabled, x => x.Ignore())
                    .ForMember(w => w.AccessFailedCount, x => x.Ignore())
                    .ForMember(w => w.Claims, x => x.Ignore())
                    .ForMember(w => w.Logins, x => x.Ignore())
                    .ForMember(w => w.Id, x => x.Ignore())
                    .ForMember(w => w.Roles, x => x.Ignore())
                    .ForMember(w => w.ShippingAddress, opt => opt.Condition(src => src.ShippingAddress != null))
                    .ForMember(w => w.BillingAddress, opt => opt.Condition(src => src.BillingAddress != null))
                    .AfterMap((src, dest) =>
                    {
                        if (dest.ShippingAddress != null && dest.ShippingAddressId.HasValue)
                        {
                            dest.ShippingAddress.AddressId = dest.ShippingAddressId.Value;
                        }
                        if (dest.BillingAddress != null && dest.BillingAddressId.HasValue)
                        {
                            dest.BillingAddress.AddressId = dest.BillingAddressId.Value;
                        }
                    })
                ;

                cfg.CreateMap<ToptalShopAddUserAddress, AddressViewModel>();
                cfg.CreateMap<ToptalShopAppUser, UserViewModel>();

                cfg.CreateMap<Product, ProductViewModel>();

                cfg.CreateMap<ToptalShopAddUserAddress, Address>();

                cfg.CreateMap<SalesOrder, SalesOrderViewModel>()
                    .ForMember(w => w.Id, o => o.MapFrom(s => s.SalesOrderId));
                cfg.CreateMap<SalesOrderLine, SalesOrderLineViewModel>();
                cfg.CreateMap<Address, AddressViewModel>();
            });
        }
    }
}