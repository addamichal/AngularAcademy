﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;

using System.Web.Http;
using AutoMapper;
using PayPal.Api;
using ToptalShop.Api.DataLayer;
using ToptalShop.Api.Engines;
using ToptalShop.Api.Models;

namespace ToptalShop.Api.Controllers
{
    public class PaypalPaymentController : BaseApiController
    {
        private readonly ToptalShopDbContext ctx;

        public PaypalPaymentController(ToptalShopDbContext ctx, UserEngine userEngine) : base(userEngine)
        {
            this.ctx = ctx;
        }

        /// <summary>
        /// Allows creation of paypal payment
        /// </summary>
        /// <param name="cartLines"></param>
        /// <returns></returns>
        public IHttpActionResult Post(List<CartLineBindingModel> cartLines)
        {
            if (!ModelState.IsValid) throw new Exception();

            var order = CreateSalesOrder(cartLines);
            var paypalPayment = CreatePaypalPayment(order);
            order.PaypalReference = paypalPayment.id;
            this.ctx.SalesOrders.Add(order);
            this.ctx.SaveChanges();

            return Created("", paypalPayment);
        }

        private Payment CreatePaypalPayment(SalesOrder order)
        {
            var apiContext = GetApiContext();

            // Create a new payment object
            var shippingAddress = this.CurrentUser.ShippingAddress;
            var payment = new Payment
            {
                intent = "sale",
                payer = new Payer
                {
                    payment_method = "paypal"
                },
                transactions = new List<Transaction>
                {
                    new Transaction
                    {
                        description = "TotalShop Purchase",
                        amount = new Amount
                        {
                            currency = "USD",
                            total = order.TotalPrice.ToString(), // PayPal expects string amounts, eg. "20.00"
                        },
                        item_list = new ItemList()
                        {
                            items = order.Lines.Select(l => new Item()
                            {
                                description = l.Description,
                                currency = "USD",
                                quantity = l.Quantity.ToString(),
                                price = (l.UnitPrice).ToString()
                            }).ToList(),
                            shipping_address = new ShippingAddress()
                            {
                                recipient_name = shippingAddress.FirstName + " " + shippingAddress.LastName,
                                line1 = shippingAddress.Address1,
                                line2 = shippingAddress.Address2,
                                city = shippingAddress.City,
                                country_code = "US",
                                postal_code = shippingAddress.Zip,
                                state = shippingAddress.State
                            }
                        }
                    }
                },
                redirect_urls = new RedirectUrls
                {
                    return_url = Url.Link("DefaultApi", new { controller = nameof(PaypalPaymentExecuteController) }),
                    cancel_url = Url.Link("DefaultApi", new { controller = nameof(PaypalPaymentExecuteController) })
                }
            };

            var createdPayment = payment.Create(apiContext);
            return createdPayment;
        }

        private SalesOrder CreateSalesOrder(List<CartLineBindingModel> cartLines)
        {
            var order = new SalesOrder();

            order.CreatedById = CurrentUser.Id;
            order.Email = CurrentUser.Email;
            order.ShippingAddress = Mapper.Map<DataLayer.Address>(CurrentUser.ShippingAddress);
            order.BillingAddress = Mapper.Map<DataLayer.Address>(CurrentUser.BillingAddress);

            foreach (var cartLine in cartLines)
            {
                var salesOrderLine = new SalesOrderLine();
                var product = ctx.Products.SingleOrDefault(w => w.ProductId == cartLine.ProductId);
                if (product == null) throw new Exception($"Product with ProductId: {cartLine.ProductId} not found");

                salesOrderLine.Product = product;
                salesOrderLine.Description = product.Description;
                salesOrderLine.UnitPrice = product.Price;
                salesOrderLine.Quantity = cartLine.Quantity;
                salesOrderLine.Price = salesOrderLine.Quantity * salesOrderLine.UnitPrice;

                order.Lines.Add(salesOrderLine);
            }
            order.TotalPrice = order.Lines.Sum(w => w.Price);
            return order;
        }

        private APIContext GetApiContext()
        {
            // Authenticate with PayPal
            var config = ConfigManager.Instance.GetProperties();
            var accessToken = new OAuthTokenCredential(config).GetAccessToken();
            var apiContext = new APIContext(accessToken);
            return apiContext;
        }
    }
}
