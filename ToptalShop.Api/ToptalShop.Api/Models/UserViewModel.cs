using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace ToptalShop.Api.Models
{
    public class UserViewModel
    {
        public string Id { get; set; }

        public string Email { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        public ToptalShopAppUserRole UserRole { get; set; }

        public AddressViewModel ShippingAddress { get; set; }
        public AddressViewModel BillingAddress { get; set; }
    }

    public class AddressViewModel
    {
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public int Zip { get; set; }
    }
}