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

                cfg.CreateMap<AddProfileBindingModel, EditToptalShopAppUser>()
                    .ForMember(w => w.UserRole, x => x.Ignore());

                cfg.CreateMap<UpdateProfileBindingModel, EditToptalShopAppUser>()
                    .ForMember(w => w.UserRole, x => x.Ignore());

                cfg.CreateMap<ApplicationUser, ToptalShopAppUser>()
                    .ForMember(w => w.UserRole, x => x.Ignore());

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
                    .ForMember(w => w.Roles, x => x.Ignore());

                cfg.CreateMap<ToptalShopAppUser, UserViewModel>();

                cfg.CreateMap<Product, ProductViewModel>();
            });
        }
    }
}