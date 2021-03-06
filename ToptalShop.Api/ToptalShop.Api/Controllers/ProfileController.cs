﻿using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Http.ModelBinding;
using AutoMapper;
using Newtonsoft.Json.Linq;
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

            if (!IsRecaptchaValid(model))
            {
                return BadRequest("Recaptcha error");
            }

            var shopAppUser = Mapper.Map<EditToptalShopAppUser>(model);
            shopAppUser.UserRole = ToptalShopAppUserRole.RegularUser;

            var userResult = _userEngine.CreateUser(shopAppUser);
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

            var shopAppUser = Mapper.Map<EditToptalShopAppUser>(model);
            shopAppUser.UserRole = CurrentUser.UserRole;

            var userResult = _userEngine.UpdateUser(CurrentUser.Id, shopAppUser);
            if (!userResult.Succeeded)
                return GetErrorResult(userResult);

            return StatusCode(HttpStatusCode.NoContent);
        }

        private static bool IsRecaptchaValid(AddProfileBindingModel model)
        {
            string secretKey = ConfigurationManager.AppSettings["Recaptcha"];
            var client = new WebClient();
            var recaptcha =
                client.DownloadString(
                    $"https://www.google.com/recaptcha/api/siteverify?secret={secretKey}&response={model.Recaptcha}");
            var obj = JObject.Parse(recaptcha);
            var recaptchaResult = (bool)obj.SelectToken("success");
            return recaptchaResult;
        }
    }
}
