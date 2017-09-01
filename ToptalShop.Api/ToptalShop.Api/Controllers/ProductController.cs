using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Web.Http;
using AutoMapper;
using ToptalShop.Api.DataLayer;
using ToptalShop.Api.Models;

namespace ToptalShop.Api.Controllers
{
    public class ProductController : ApiController
    {
        private readonly ToptalShopDbContext ctx;

        public ProductController(ToptalShopDbContext ctx)
        {
            this.ctx = ctx;
        }

        public IHttpActionResult Get()
        {
            var products = ctx.Products.ToList();
            var productDtos = products.Select(w => Mapper.Map<Product, ProductViewModel>(w)).ToList();

            return Ok(productDtos);
        }
    }
}