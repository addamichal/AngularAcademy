using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using Autofac;
using Autofac.Integration.WebApi;

namespace ToptalShop.Api
{
    public static class ContainerExtensions
    {
        public static void RegisterWebApi(this IContainer container, HttpConfiguration config)
        {
            var builder = new ContainerBuilder();

            //WebApi controllers
            builder.RegisterApiControllers(typeof(WebApiApplication).Assembly);

            //Register WebApi Filters
            builder.RegisterWebApiFilterProvider(config);

            builder.Update(container);
        }

    }
}