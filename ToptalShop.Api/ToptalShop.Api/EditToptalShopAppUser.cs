using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ToptalShop.Api.DataLayer;

namespace ToptalShop.Api
{
    public class EditToptalShopAppUser
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public ToptalShopAppUserRole UserRole { get; set; }
        public EditAddress BillingAddress { get; set; }
        public EditAddress ShippingAddress { get; set; }

        public override string ToString()
        {
            return string.Format("User: Email: {0}, UserRole: {1}", this.Email, this.UserRole);
        }
    }

    public class EditAddress
    {
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public int Zip { get; set; }
    }
}