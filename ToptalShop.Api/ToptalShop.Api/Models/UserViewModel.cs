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

    }
}