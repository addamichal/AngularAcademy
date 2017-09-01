using System;
using System.Linq;
using System.Web;
using System.Web.Http.ExceptionHandling;

namespace ToptalShop.Api
{
    public class ToptalShopAppExceptionLogger : ExceptionLogger
    {
        public override void Log(ExceptionLoggerContext context)
        {
            Serilog.Log.Error(context.Exception, "ExceptionOccured: {Message}, HttpRequest: {HttpRequest}", context.Exception.Message, context.Request);
        }
    }
}