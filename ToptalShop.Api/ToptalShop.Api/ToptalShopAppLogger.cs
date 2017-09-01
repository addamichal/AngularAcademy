using System.Diagnostics;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

namespace ToptalShop.Api
{
    public class ToptalShopAppLogger : DelegatingHandler
    {
        protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            var sw = new Stopwatch();
            sw.Start();

            var uri = request.RequestUri;
            var method = request.Method;
            Serilog.Log.Information("Calling: {Request} ({$Method})", uri, method);
            var result = await base.SendAsync(request, cancellationToken);

            sw.Stop();
            Serilog.Log.Information("{Request} returned {$Response}, Took: {Took}", uri, result.StatusCode, sw.Elapsed);

            return result;
        }
    }
}