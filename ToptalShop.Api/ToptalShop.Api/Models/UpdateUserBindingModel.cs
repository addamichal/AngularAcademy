using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace ToptalShop.Api.Models
{
    public class UpdateUserBindingModel
    {
        [Required]
        public string Email { get; set; }

        [DataType(DataType.Password)]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [Display(Name = "Confirm new password")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }

        [Required]
        [EnumDataType(typeof(ToptalShopAppUserRole))]
        [JsonConverter(typeof(StringEnumConverter))]
        public ToptalShopAppUserRole UserRole { get; set; }
    }
}