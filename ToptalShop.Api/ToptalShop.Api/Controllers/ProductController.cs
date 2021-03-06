﻿using System;
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

        /// <summary>
        /// Allows to list all available products
        /// </summary>
        /// <returns></returns>
        [AllowAnonymous]
        public IHttpActionResult Get()
        {
            var products = ctx.Products.ToList();
            var productDtos = products.Select(w => Mapper.Map<Product, ProductViewModel>(w)).ToList();

            return Ok(productDtos);
        }

        /// <summary>
        /// Allows creation of product
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
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

        /// <summary>
        /// Allows aupdate of product
        /// </summary>
        /// <param name="id"></param>
        /// <param name="model"></param>
        /// <returns></returns>
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

        /// <summary>
        /// Allows deletion of product
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [CustomAuthorize(Roles = "Admin")]
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