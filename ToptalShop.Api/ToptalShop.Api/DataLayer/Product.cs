using System;

namespace ToptalShop.Api.DataLayer
{
    public class Product
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }

        public DateTime Created { get; set; }
        public DateTime Modified { get; set; }

        public Product()
        {
            Created = DateTime.Now;
            Modified = DateTime.Now;
        }
    }
}