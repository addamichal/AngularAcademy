using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.ExceptionHandling;
using Autofac.Integration.WebApi;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace ToptalShop.Api
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            GlobalMapper.Initialize();

            config.Services.Add(typeof(IExceptionLogger), new ToptalShopAppExceptionLogger());

            config.MessageHandlers.Add(new ToptalShopAppLogger());
            config.MessageHandlers.Add(new NoCacheHeaderHandler());

            //register json only
            config.Formatters.Clear();
            config.Formatters.Add(new JsonMediaTypeFormatter());
            config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();

            //autofac registration...
            var container = ToptalShopAppContainer.Instance();
            container.RegisterWebApi(config);
            config.DependencyResolver = new AutofacWebApiDependencyResolver(container);

            // Web API configuration and services
            // Configure Web API to use only bearer token authentication.
            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
