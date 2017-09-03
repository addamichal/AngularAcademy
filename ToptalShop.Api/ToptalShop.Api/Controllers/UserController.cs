using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using AutoMapper;
using Serilog;
using ToptalShop.Api.Engines;
using ToptalShop.Api.Models;

namespace ToptalShop.Api.Controllers
{
    [CustomAuthorize]
    [RoutePrefix("api/User")]
    [CustomAuthorize(Roles = "Admin, UserManager")]
    public class UserController : BaseApiController
    {
        public UserController(UserEngine userEngine) : base(userEngine)
        {
        }

        /// <summary>
        /// Allows retrieving information about user by his id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [ResponseType(typeof(UserViewModel))]
        public IHttpActionResult Get(string id)
        {
            var shopAppUser = _userEngine.FindById(id);
            if (shopAppUser == null)
                return NotFound();

            if (shopAppUser.UserRole == ToptalShopAppUserRole.Admin && CurrentUser.UserRole == ToptalShopAppUserRole.UserManager)
            {
                Log.Warning("Current user: {User} doesn't have privileges to get Admin user, UserId: {UserId}", CurrentUser, id);
                throw new HttpResponseException(HttpStatusCode.Forbidden);
            }

            var userInfoViewModel = Mapper.Map<UserViewModel>(shopAppUser);
            return Ok(userInfoViewModel);
        }

        /// <summary>
        /// Retrieves information about all users in the system
        /// </summary>
        /// <returns></returns>
        [ResponseType(typeof(List<UserViewModel>))]
        public IHttpActionResult Get()
        {
            var users = _userEngine.GetAllUsers();
            if (CurrentUser.UserRole == ToptalShopAppUserRole.UserManager)
                users = users.Where(user => user.UserRole != ToptalShopAppUserRole.Admin).ToList();

            var userViewModels = users.Select(Mapper.Map<UserViewModel>);
            return Ok(userViewModels);
        }

        /// <summary>
        /// Allows creation of the new user
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [ResponseType(typeof(UserViewModel))]
        public IHttpActionResult Post(AddUserBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                LogInvalidModelState(ModelState);
                return BadRequest(ModelState);
            }

            if (CurrentUser.UserRole == ToptalShopAppUserRole.UserManager && model.UserRole == ToptalShopAppUserRole.Admin)
            {
                Log.Warning("Current user: {User} doesn't have privileges to create Admin users", CurrentUser);
                throw new HttpResponseException(HttpStatusCode.Forbidden);
            }

            var shopAppUser = Mapper.Map<EditToptalShopAppUser>(model);
            var createUserResult = _userEngine.CreateUser(shopAppUser);

            if (!createUserResult.Succeeded)
                return GetErrorResult(createUserResult);

            var createdShopAppUser = Mapper.Map<UserViewModel>(createUserResult.ToptalShopAppUser);
            return CreatedAtRoute("DefaultApi", new { id = createdShopAppUser.Id }, createdShopAppUser);
        }

        /// <summary>
        /// Allows update of existing user
        /// </summary>
        /// <param name="id"></param>
        /// <param name="model"></param>
        /// <returns></returns>
        [ResponseType(typeof(void))]
        public IHttpActionResult Put(string id, UpdateUserBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                LogInvalidModelState(ModelState);
                return BadRequest(ModelState);
            }

            if (model.UserRole == ToptalShopAppUserRole.Admin && CurrentUser.UserRole == ToptalShopAppUserRole.UserManager)
            {
                Log.Warning("Current user: {User} doesn't have privileges to set Admin role for user", CurrentUser);
                throw new HttpResponseException(HttpStatusCode.Forbidden);
            }
            var existingUser = _userEngine.FindById(id);
            if (existingUser == null)
                return NotFound();

            if (existingUser.UserRole == ToptalShopAppUserRole.Admin && CurrentUser.UserRole == ToptalShopAppUserRole.UserManager)
            {
                Log.Warning("Current user: {User} doesn't have privileges to update Admin user", CurrentUser);
                throw new HttpResponseException(HttpStatusCode.Forbidden);
            }

            var shopAppUser = Mapper.Map<EditToptalShopAppUser>(model);
            var userResult = _userEngine.UpdateUser(id, shopAppUser);

            if (!userResult.Succeeded)
                return GetErrorResult(userResult);

            return StatusCode(HttpStatusCode.NoContent);
        }

        /// <summary>
        /// Allows deletion of existing user
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [ResponseType(typeof(void))]
        public IHttpActionResult Delete(string id)
        {
            var userToBeDeleted = _userEngine.FindById(id);
            if (userToBeDeleted == null)
                return NotFound();

            if (userToBeDeleted.UserRole == ToptalShopAppUserRole.Admin && CurrentUser.UserRole == ToptalShopAppUserRole.UserManager)
            {
                Log.Warning("Current user: {User} doesn't have privileges to delete Admin user, UserId: {UserId}", CurrentUser, id);
                throw new HttpResponseException(HttpStatusCode.Forbidden);
            }

            if (CurrentUser.Id == userToBeDeleted.Id)
            {
                Log.Warning("Logged in user cannot delete himself, Current user: {User}", CurrentUser);
                throw new HttpResponseException(HttpStatusCode.Forbidden);
            }

            var deleteResult = _userEngine.Delete(id);
            if (!deleteResult.Succeeded)
                return GetErrorResult(deleteResult);

            return StatusCode(HttpStatusCode.NoContent);
        }
    }
}
