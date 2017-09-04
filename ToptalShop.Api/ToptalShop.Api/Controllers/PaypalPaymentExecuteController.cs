using System;
using System.Linq;
using System.Web.Http;
using PayPal.Api;
using ToptalShop.Api.DataLayer;
using ToptalShop.Api.Models;

namespace ToptalShop.Api.Controllers
{
    public class PaypalPaymentExecuteController : ApiController
    {
        private readonly ToptalShopDbContext toptalShopDbContext;

        public PaypalPaymentExecuteController(ToptalShopDbContext toptalShopDbContext)
        {
            this.toptalShopDbContext = toptalShopDbContext;
        }

        public IHttpActionResult Post(PaymentBindingModel paymentDto)
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

            var salesOrder = toptalShopDbContext.SalesOrders.SingleOrDefault(w => w.PaypalReference == paymentDto.PaymentID);
            if (salesOrder == null) throw new Exception($"Unable to find SalesOrder with PaypalReference: {paymentDto.PaymentID}");

            salesOrder.Status = SalesOrderStatus.Paid;
            toptalShopDbContext.SaveChanges();

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
}