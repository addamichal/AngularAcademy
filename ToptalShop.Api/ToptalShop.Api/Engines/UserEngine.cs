using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using AutoMapper;
using Microsoft.AspNet.Identity;
using Serilog;
using ToptalShop.Api.DataLayer;
using ToptalShop.Api.Models;

namespace ToptalShop.Api.Engines
{
    public class UserEngine
    {
        private readonly ApplicationUserManager _applicationUserManager;
        private readonly ApplicationRoleManager _applicationRoleManager;
        private readonly ToptalShopDbContext _toptalShopDbContext;

        public UserEngine(
            ApplicationUserManager applicationUserManager,
            ApplicationRoleManager applicationRoleManager,
            ToptalShopDbContext toptalShopDbContext)
        {
            _applicationUserManager = applicationUserManager;
            _applicationRoleManager = applicationRoleManager;
            _toptalShopDbContext = toptalShopDbContext;
        }

        public List<ToptalShopAppUser> GetAllUsers()
        {
            return _toptalShopDbContext.Users.ToList().Select(Map).ToList();
        }

        public ToptalShopAppUser FindById(string id)
        {
            var userFromDb = FindApplicationUserById(id);
            if (userFromDb == null)
                return null;

            return Map(userFromDb);
        }

        public ToptalShopAppUser FindByEmail(string email)
        {
            var userFromDb = _toptalShopDbContext.Users.SingleOrDefault(w => w.Email == email);
            if (userFromDb == null)
                return null;

            return Map(userFromDb);
        }

        public UserResult CreateUser(EditToptalShopAppUser editToptalShopAppUser)
        {
            using (var transaction = _toptalShopDbContext.Database.BeginTransaction())
            {
                try
                {
                    var user = Mapper.Map<ApplicationUser>(editToptalShopAppUser);
                    IdentityResult createUserResult = _applicationUserManager.Create(user, editToptalShopAppUser.Password);

                    if (!createUserResult.Succeeded)
                    {
                        transaction.Rollback();
                        Log.Warning("Creating user failed, User: {User}, Errors: {Errors}", editToptalShopAppUser, createUserResult.Errors);
                        return new UserResult(createUserResult.Errors);
                    }

                    var addToRoleResult = _applicationUserManager.AddToRole(user.Id, editToptalShopAppUser.UserRole.ToString());
                    if (!addToRoleResult.Succeeded)
                    {
                        transaction.Rollback();
                        Log.Warning("Assignment of user to role failed, User: {User}, Errors: {Errors}", editToptalShopAppUser, addToRoleResult.Errors);
                        return new UserResult(addToRoleResult.Errors);

                    }

                    var shopAppUser = Map(user);

                    transaction.Commit();
                    Log.Information("User: {User} successfully created", editToptalShopAppUser);

                    return new UserResult(shopAppUser);
                }
                catch (Exception e)
                {
                    Log.Error(e, "Error while creating User: {User}, Message: {Message}", editToptalShopAppUser, e.Message);
                    transaction.Rollback();
                    throw;
                }
            }
        }

        public UserResult UpdateUser(string userId, EditToptalShopAppUser editToptalShopAppUser)
        {
            using (var transaction = _toptalShopDbContext.Database.BeginTransaction())
            {
                try
                {
                    var existingUser = FindApplicationUserById(userId);
                    if (existingUser == null)
                        throw new Exception("User does not exist: " + userId);

                    Mapper.Map(editToptalShopAppUser, existingUser);

                    if (editToptalShopAppUser.Password != null)
                        existingUser.PasswordHash = _applicationUserManager.PasswordHasher.HashPassword(editToptalShopAppUser.Password);

                    var updateResult = _applicationUserManager.Update(existingUser);
                    if (!updateResult.Succeeded)
                    {
                        transaction.Rollback();
                        Log.Warning("User update failed, User: {User}, Errors: {Errors}", editToptalShopAppUser, updateResult.Errors);
                        return new UserResult(updateResult.Errors);
                    }

                    var existingRole = GetUserRole(existingUser);
                    if (existingRole != editToptalShopAppUser.UserRole)
                    {
                        var removeRoleResult = _applicationUserManager.RemoveFromRole(existingUser.Id, existingRole.ToString());
                        if (!removeRoleResult.Succeeded)
                        {
                            transaction.Rollback();
                            Log.Warning("Remove role failed, User: {User}, Errors: {Errors}", editToptalShopAppUser, removeRoleResult.Errors);
                            return new UserResult(removeRoleResult.Errors);
                        }
                        var addRoleResult = _applicationUserManager.AddToRole(existingUser.Id, editToptalShopAppUser.UserRole.ToString());
                        if (!addRoleResult.Succeeded)
                        {
                            transaction.Rollback();
                            Log.Warning("Add role failed, User: {User}, Errors: {Errors}", editToptalShopAppUser, addRoleResult.Errors);
                            return new UserResult(addRoleResult.Errors);
                        }
                    }

                    var shopAppUser = Map(existingUser);

                    transaction.Commit();
                    Log.Information("User: {User} updated successfully", editToptalShopAppUser);

                    return new UserResult(shopAppUser);
                }
                catch (Exception e)
                {
                    Log.Error(e, "Error while updating User: {User}, Message: {Message}", editToptalShopAppUser, e.Message);
                    transaction.Rollback();
                    throw;
                }
            }
        }

        public UserResult Delete(string userId)
        {
            var user = _applicationUserManager.FindById(userId);
            if (user == null)
                throw new Exception("User does not exist: " + userId);

            var shopAppUser = Map(user);
            var deleteResult = _applicationUserManager.Delete(user);
            if (deleteResult.Succeeded)
                return new UserResult(shopAppUser);

            return new UserResult(deleteResult.Errors);
        }

        private ToptalShopAppUser Map(ApplicationUser applicationUser)
        {
            var shopAppUser = Mapper.Map<ToptalShopAppUser>(applicationUser);
            shopAppUser.UserRole = GetUserRole(applicationUser);
            return shopAppUser;
        }

        private ToptalShopAppUserRole GetUserRole(ApplicationUser applicationUser)
        {
            var userRole = _applicationUserManager.GetRoles(applicationUser.Id).SingleOrDefault();

            ToptalShopAppUserRole toptalShopAppUserRole;
            var tryParseResult = Enum.TryParse(userRole, out toptalShopAppUserRole);
            if (!tryParseResult)
                throw new Exception("Unable to parse Role: " + userRole);

            return toptalShopAppUserRole;
        }

        private ApplicationUser FindApplicationUserById(string id)
        {
            return _toptalShopDbContext.Users
                .Include(w => w.ShippingAddress)
                .Include(w => w.BillingAddress)
                .SingleOrDefault(w => w.Id == id);
        }
    }
}