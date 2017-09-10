using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ToptalShop.Api.DataLayer;

namespace ToptalShop.Api
{
    public class ToptalShopAppUser
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public ToptalShopAppUserRole UserRole { get; set; }
        public ToptalShopAddUserAddress BillingAddress { get; set; }
        public ToptalShopAddUserAddress ShippingAddress { get; set; }

        public override string ToString()
        {
            return string.Format("User: Email: {0}, UserRole: {1}", this.Email, this.UserRole);
        }

    }

    public class ToptalShopAddUserAddress
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int AddressId { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
    }
}