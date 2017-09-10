using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AutoMapper;
using ToptalShop.Api.DataLayer;
using ToptalShop.Api.Engines;
using ToptalShop.Api.Models;

namespace ToptalShop.Api.Controllers
{
    public class OrderController : BaseApiController
    {
        private readonly ToptalShopDbContext ctx;

        public OrderController(UserEngine userEngine, ToptalShopDbContext ctx) : base(userEngine)
        {
            this.ctx = ctx;
        }

        public IEnumerable<SalesOrderViewModel> Get()
        {
            return GetOrders()
                .ToList()
                .Select(Mapper.Map<SalesOrder, SalesOrderViewModel>)
                .ToList();
        }

        [CustomAuthorize(Roles = nameof(ToptalShopAppUserRole.Manager))]
        public IHttpActionResult Put(int id, UpdateSalesOrderStatusBindingModel model)
        {
            var existingSalesOrder = GetOrders().SingleOrDefault(w => w.SalesOrderId == id);
            if (existingSalesOrder == null)
                return NotFound();

            existingSalesOrder.Status = model.Status;
            ctx.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        [CustomAuthorize(Roles = nameof(ToptalShopAppUserRole.Admin))]
        public IHttpActionResult Delete(int id)
        {
            var existingSalesOrder = GetOrders().SingleOrDefault(w => w.SalesOrderId == id);
            if (existingSalesOrder == null)
                return NotFound();

            ctx.SalesOrderLines.RemoveRange(existingSalesOrder.Lines);
            ctx.Addresses.Remove(existingSalesOrder.ShippingAddress);
            ctx.Addresses.Remove(existingSalesOrder.BillingAddress);
            ctx.SalesOrders.Remove(existingSalesOrder);

            ctx.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        private IQueryable<SalesOrder> GetOrders()
        {
            var ordersQuery = ctx.SalesOrders
                .Where(o => o.Status != SalesOrderStatus.Opened)
                .Include(o => o.ShippingAddress)
                .Include(o => o.BillingAddress)
                .Include(o => o.Lines);

            if (CurrentUser.UserRole == ToptalShopAppUserRole.RegularUser)
            {
                ordersQuery = ordersQuery.Where(o => o.CreatedById == CurrentUser.Id);
            }

            return ordersQuery;
        }
    }
}