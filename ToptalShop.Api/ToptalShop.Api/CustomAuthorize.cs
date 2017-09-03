using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Web;
using System.Web.Http;
using System.Web.Http.Controllers;
using Autofac;
using Microsoft.AspNet.Identity;
using Serilog;
using ToptalShop.Api.Engines;

namespace ToptalShop.Api
{
    public class CustomAuthorize : AuthorizeAttribute
    {
        protected override bool IsAuthorized(HttpActionContext actionContext)
        {
            var isAuthorized = base.IsAuthorized(actionContext);
            if (isAuthorized)
            {
                var currentPrincipal = actionContext.RequestContext.Principal;
                var userId = currentPrincipal.Identity.GetUserId();

                var identity = currentPrincipal.Identity;
                var currentRole = ((ClaimsIdentity)identity).Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).ToList().SingleOrDefault();

                using (var scope = ToptalShopAppContainer.Instance().BeginLifetimeScope())
                {
                    var userEngine = scope.Resolve<UserEngine>();
                    var shopAppUser = userEngine.FindById(userId);
                    if (shopAppUser == null)
                    {
                        Log.Information("User with UserId: {UserId} not found, was probably deleted, returning Unauthorized", userId);
                        return false;
                    }

                    var userRoleFromDb = shopAppUser.UserRole.ToString();
                    if (userRoleFromDb != currentRole)
                    {
                        Log.Information("User role changed from {OldUserRole} to UserRole: {NewUserRole}, UserId: {UserId}, returning Unauthorized", currentRole, userRoleFromDb, userId);
                        return false;
                    }

                    return true;
                }
            }
            return false;
        }
    }
}