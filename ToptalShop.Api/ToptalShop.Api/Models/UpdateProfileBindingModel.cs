using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace ToptalShop.Api.Models
{
    public class UpdateProfileBindingModel
    {
        [Required]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }

        public AddressBindingModel ShippingAddress { get; set; }
        public AddressBindingModel BillingAddress { get; set; }
    }

    public class AddressBindingModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
    }

    public class UpdateSalesOrderStatusBindingModel
    {
        public int Id { get; set; }
        [JsonConverter(typeof(StringEnumConverter))]
        public SalesOrderStatus Status { get; set; }
    }
}