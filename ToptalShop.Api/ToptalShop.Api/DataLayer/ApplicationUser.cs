using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace ToptalShop.Api.DataLayer
{
    public class ApplicationUser : IdentityUser
    {
        public int? ShippingAddressId { get; set; }
        public int? BillingAddressId { get; set; }

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager, string authenticationType)
        {
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
            return userIdentity;
        }
        
        [ForeignKey(nameof(ShippingAddressId))]
        public virtual Address ShippingAddress { get; set; }
        [ForeignKey(nameof(BillingAddressId))]
        public virtual Address BillingAddress { get; set; }
    }
}