using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Web.Http;
using AutoMapper;
using Serilog;
using ToptalShop.Api.DataLayer;
using ToptalShop.Api.Engines;
using ToptalShop.Api.Models;

namespace ToptalShop.Api.Controllers
{
    public class ProductController : BaseApiController
    {
        private readonly ToptalShopDbContext ctx;

        public ProductController(UserEngine userEngine, ToptalShopDbContext ctx) : base(userEngine)
        {
            this.ctx = ctx;
        }

        [AllowAnonymous]
        public IHttpActionResult Get()
        {
            var products = ctx.Products.ToList();
            var productDtos = products.Select(w => Mapper.Map<Product, ProductViewModel>(w)).ToList();

            return Ok(productDtos);
        }

        public IHttpActionResult Post(ProductViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdProduct = Mapper.Map<ProductViewModel, Product>(model);
            ctx.Products.Add(createdProduct);
            ctx.SaveChanges();

            var result = Mapper.Map<Product, ProductViewModel>(createdProduct);
            return Created("", result);
        }

        public IHttpActionResult Put(int id, ProductViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingProduct = ctx.Products.SingleOrDefault(w => w.ProductId == id);
            if (existingProduct == null)
                return NotFound();

            Mapper.Map(model, existingProduct);
            ctx.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        public IHttpActionResult Delete(int id)
        {
            var existingProduct = ctx.Products.SingleOrDefault(w => w.ProductId == id);
            if (existingProduct == null)
                return NotFound();

            if (ctx.SalesOrderLines.Any(w => w.ProductId == id))
            {
                return BadRequest("Cannot delete product, because there are orders which contain it");
            }

            ctx.Products.Remove(existingProduct);
            ctx.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }
    }
}