using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ToptalShop.Api.Engines
{
    public class UserResult
    {
        public bool Succeeded { get; set; }
        public ToptalShopAppUser ToptalShopAppUser { get; set; }
        public IEnumerable<string> Errors { get; set; }

        public UserResult(ToptalShopAppUser toptalShopAppUser)
        {
            this.ToptalShopAppUser = toptalShopAppUser;
            this.Succeeded = true;
        }

        public UserResult(IEnumerable<string> errors)
        {
            this.Errors = errors;
        }
    }
}