using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ToptalShop.Api
{
    public class ToptalShopAppUser
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public ToptalShopAppUserRole UserRole { get; set; }

        public override string ToString()
        {
            return string.Format("User: Email: {0}, UserRole: {1}", this.Email, this.UserRole);
        }

    }
}