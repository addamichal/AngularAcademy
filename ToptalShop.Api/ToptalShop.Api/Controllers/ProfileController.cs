using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Http.ModelBinding;
using AutoMapper;
using ToptalShop.Api.Engines;
using ToptalShop.Api.Models;

namespace ToptalShop.Api.Controllers
{
    [CustomAuthorize]
    [RoutePrefix("api/Profile")]
    public class ProfileController : BaseApiController
    {
        public ProfileController(UserEngine userEngine) : base(userEngine)
        {
        }

        /// <summary>
        /// Allows authorize user to retrieve his profile information
        /// </summary>
        /// <returns></returns>
        [ResponseType(typeof(UserViewModel))]
        public IHttpActionResult Get()
        {
            var currentUser = CurrentUser;
            var userViewModel = Mapper.Map<UserViewModel>(currentUser);
            return Ok(userViewModel);
        }

        /// <summary>
        /// Allows new user to create profile (register)
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        // POST api/profile
        [ResponseType(typeof(UserViewModel))]
        [AllowAnonymous]
        public IHttpActionResult Post(AddProfileBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                LogInvalidModelState(ModelState);
                return BadRequest(ModelState);
            }

            var expenseAppUser = Mapper.Map<EditToptalShopAppUser>(model);
            expenseAppUser.UserRole = ToptalShopAppUserRole.RegularUser;

            var userResult = _userEngine.CreateUser(expenseAppUser);
            if (!userResult.Succeeded)
                return GetErrorResult(userResult);

            var userViewModel = Mapper.Map<UserViewModel>(userResult.ToptalShopAppUser);
            return CreatedAtRoute("DefaultApi", new { id = userViewModel.Id, controller = "user" }, userViewModel);
        }

        /// <summary>
        /// Allows user to update his profile
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        // PUT api/profile
        [ResponseType(typeof(void))]
        public IHttpActionResult Put(UpdateProfileBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                LogInvalidModelState(ModelState);
                return BadRequest(ModelState);
            }

            var expenseAppUser = Mapper.Map<EditToptalShopAppUser>(model);
            expenseAppUser.UserRole = CurrentUser.UserRole;

            var userResult = _userEngine.UpdateUser(CurrentUser.Id, expenseAppUser);
            if (!userResult.Succeeded)
                return GetErrorResult(userResult);

            return StatusCode(HttpStatusCode.NoContent);
        }
    }
}
