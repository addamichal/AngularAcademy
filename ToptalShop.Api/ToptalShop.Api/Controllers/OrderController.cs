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
            return ctx.SalesOrders
                .Where(o => o.CreatedById == CurrentUser.Id && o.Status != SalesOrderStatus.Opened)
                .Include(o => o.ShippingAddress)
                .Include(o => o.BillingAddress)
                .Include(o => o.Lines)
                .ToList()
                .Select(Mapper.Map<SalesOrder, SalesOrderViewModel>)
                .ToList();
        }
    }
}