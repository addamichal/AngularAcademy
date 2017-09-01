using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Autofac;
using Autofac.Features.Metadata;
using Autofac.Features.ResolveAnything;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using ToptalShop.Api.DataLayer;
using ToptalShop.Api.Models;

namespace ToptalShop.Api
{
    public class ToptalShopAppContainer
    {
        private static IContainer _container;

        public static IContainer Instance()
        {
            if (_container == null)
            {
                var builder = new ContainerBuilder();

                //register web api types
                builder.RegisterType<ApplicationUserManager>().InstancePerLifetimeScope();
                builder.RegisterType<ToptalShopDbContext>().InstancePerLifetimeScope();
                builder.Register(c => new UserStore<ApplicationUser>(c.Resolve<ToptalShopDbContext>())).AsImplementedInterfaces().InstancePerLifetimeScope();
                builder.Register(c => new RoleStore<IdentityRole>(c.Resolve<ToptalShopDbContext>())).AsImplementedInterfaces().InstancePerLifetimeScope();
                builder.Register(c => new IdentityFactoryOptions<ApplicationUserManager>
                {
                    DataProtectionProvider = new Microsoft.Owin.Security.DataProtection.DpapiDataProtectionProvider("ExpenseApp​")
                });

                //http://stackoverflow.com/questions/21743262/autofac-mvc-5-registerwebapifilterprovider-causes-unresolveable-ioverridefilter
                builder.RegisterSource(new AnyConcreteTypeNotAlreadyRegisteredSource(t => !(t.IsGenericType && t.GetGenericTypeDefinition() == typeof(Meta<>))));

                // Set the dependency resolver to be Autofac.
                var container = builder.Build();

                _container = container;
            }
            return _container;
        }

        public static void Update<TInterfaceType>(TInterfaceType instance) where TInterfaceType : class
        {
            var containerBuilder = new ContainerBuilder();
            containerBuilder.RegisterInstance(instance).As<TInterfaceType>();
            containerBuilder.Update(_container);
        }

        public static void Update<TInterfaceType, TImplementationType>()
        {
            var containerBuilder = new ContainerBuilder();
            containerBuilder.RegisterType<TImplementationType>().As<TInterfaceType>();
            containerBuilder.Update(_container);
        }

        public static void Dispose()
        {
            _container.Dispose();
            _container = null;
        }
    }
}