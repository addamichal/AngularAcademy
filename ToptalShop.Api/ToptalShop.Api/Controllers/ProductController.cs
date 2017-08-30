using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Web.Http;

namespace ToptalShop.Api.Controllers
{
    public class ProductController : ApiController
    {
        public IEnumerable<ProductDto> Get()
        {
            Thread.Sleep(5000);

            return new List<ProductDto>()
            {
                new ProductDto() { ProductId = 1, Name = "Product 1", Description = "Product 1 description", Price = 15 },
                new ProductDto() { ProductId = 2, Name = "Product 2", Description = "Product 2 description", Price = 20 },
                new ProductDto() { ProductId = 3, Name = "Product 3", Description = "Product 3 description", Price = 25 }
            };
        }
    }

    public class ProductDto
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
    }
}