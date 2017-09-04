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
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
    }

    public class CartLineBindingModel
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }

    public class PaymentBindingModel
    {
        public string PayerID { get; set; }
        public string PaymentID { get; set; }
    }

    public class SalesOrderViewModel
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public decimal TotalPrice { get; set; }
        public string PaypalReference { get; set; }
        public List<SalesOrderLineViewModel> Lines { get; set; }
        [JsonConverter(typeof(StringEnumConverter))]
        public SalesOrderStatus Status { get; set; }

        public virtual AddressViewModel BillingAddress { get; set; }
        public virtual AddressViewModel ShippingAddress { get; set; }

        //public ApplicationUser CreatedBy { get; set; }
        //public string CreatedById { get; set; }


        public DateTime Created { get; set; }
        public DateTime Modified { get; set; }

    }

    public class SalesOrderLineViewModel
    {
        public int ProductId { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal Price { get; set; }
    }
}