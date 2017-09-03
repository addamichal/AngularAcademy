using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;

using System.Web.Http;
using PayPal.Api;

namespace ToptalShop.Api.Controllers
{
    public class PaypalPaymentController : ApiController
    {
        public IHttpActionResult Post()
        {
            if (!ModelState.IsValid) throw new Exception();

            var apiContext = GetApiContext();

            // Create a new payment object
            var payment = new Payment
            {
                experience_profile_id = "XP-5T6Z-S4T6-J8W8-U26E", // Created in the WebExperienceProfilesController. This one is for DigitalGoods.
                intent = "sale",
                payer = new Payer
                {
                    payment_method = "paypal"
                },
                transactions = new List<Transaction>
                {
                    new Transaction
                    {
                        description = $"Brewery Tour (Single Payment)",
                        amount = new Amount
                        {
                            currency = "USD",
                            total = 20m.ToString(), // PayPal expects string amounts, eg. "20.00"
                        },
                        item_list = new ItemList()
                        {
                            items = new List<Item>()
                            {
                                new Item()
                                {
                                    description = $"Brewery Tour (Single Payment)",
                                    currency = "USD",
                                    quantity = "1",
                                    price = 20m.ToString(), // PayPal expects string amounts, eg. "20.00"                                        
                                }
                            }
                        }
                    }
                },
                redirect_urls = new RedirectUrls
                {
                    return_url = "http://localhost/5261/api/paypalpayment/return",
                    cancel_url = "http://localhost/5261/api/paypalpayment/cancel"
                }
            };

            // Send the payment to PayPal
            var createdPayment = payment.Create(apiContext);
            return Created("", createdPayment);
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

    public class PaypalPaymentExecuteController : ApiController
    {
        public IHttpActionResult Post(PaymentDto paymentDto)
        {
            var apiContext = GetApiContext();

            var paymentExecution = new PaymentExecution()
            {
                payer_id = paymentDto.PayerID
            };

            var payment = new Payment()
            {
                id = paymentDto.PaymentID
            };

            // Execute the Payment
            var executedPayment = payment.Execute(apiContext, paymentExecution);
            return Created("", executedPayment);
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

    public class PaymentDto
    {
        public string PayerID { get; set; }
        public string PaymentID { get; set; }
    }
}
