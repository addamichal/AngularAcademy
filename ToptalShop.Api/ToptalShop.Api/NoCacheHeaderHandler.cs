using System.Collections.Generic;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

namespace ToptalShop.Api
{
    public class NoCacheHeaderHandler : DelegatingHandler
    {
        protected override async Task<HttpResponseMessage> SendAsync(
            HttpRequestMessage request, CancellationToken cancellationToken)
        {
            HttpResponseMessage response = await base.SendAsync(request, cancellationToken);
            response.Headers.Add("Cache-Control", new List<string>() { "no-cache", "no-store", "must-revalidate" });
            return response;
        }
    }
}