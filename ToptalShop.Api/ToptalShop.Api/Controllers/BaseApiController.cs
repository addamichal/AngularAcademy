using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using Microsoft.AspNet.Identity;
using Serilog;
using ToptalShop.Api.Engines;

namespace ToptalShop.Api.Controllers
{
    [CustomAuthorize]
    public class BaseApiController : ApiController
    {
        protected readonly UserEngine _userEngine;

        public BaseApiController(UserEngine userEngine)
        {
            _userEngine = userEngine;
        }

        public ToptalShopAppUser CurrentUser
        {
            get
            {
                var currentUserId = User.Identity.GetUserId();
                return _userEngine.FindById(currentUserId);
            }
        }

        protected IHttpActionResult GetErrorResult(UserResult result)
        {
            if (result == null)
            {
                return InternalServerError();
            }

            if (!result.Succeeded)
            {
                if (result.Errors != null)
                {
                    foreach (string error in result.Errors)
                    {
                        ModelState.AddModelError("", error);
                    }
                }

                if (ModelState.IsValid)
                {
                    // No ModelState errors are available to send, so just return an empty BadRequest.
                    return BadRequest();
                }

                LogInvalidModelState(ModelState);
                return BadRequest(ModelState);
            }

            return null;
        }

        protected void LogInvalidModelState(ModelStateDictionary modelState)
        {
            List<string> errorMessages = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage).ToList();
            Log.Warning("ModelState was invalid: {Errors}", errorMessages);
        }
    }
}
