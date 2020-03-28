import { collectDefaultMetrics, Counter, Histogram, register } from 'prom-client';
import { createServer } from 'http';
import { parse } from 'url';
import { Context } from 'mali';
collectDefaultMetrics();

export class Prometheus {
  public rpcMiddleware = async (ctx: Context, next: any): Promise<void> => {
    const startEpoch = Date.now();
    this.metrics.grpcServerStartedTotal.labels(ctx.type, ctx.name).inc();
    await next();
    this.metrics.grpcServerHandledTotal.labels(ctx.type, ctx.name).inc();
    this.metrics.grpcServerHandleTime.labels(ctx.type, ctx.name).observe(Date.now() - startEpoch);
  };

  public metrics = {
    commandCounter: new Counter({
      name: 'total_commands_used',
      help: 'Total number of used commands'
    }),
    grpcServerStartedTotal: new Counter({
      labelNames: ['grpc_type', 'grpc_method'],
      name: 'grpc_server_started_total',
      help: 'Total number of RPCs started.'
    }),
    grpcServerHandledTotal: new Counter({
      labelNames: ['grpc_type', 'grpc_service'],
      name: 'grpc_server_handled_total',
      help: 'Total number of RPCs completed.'
    }),
    grpcServerHandleTime: new Histogram({
      labelNames: ['grpc_type', 'grpc_service'],
      name: 'grpc_server_handle_time',
      buckets: [0.1, 5, 15, 50, 100, 500],
      help: 'Response latency of gRPC.'
    }),
    register
  };

  public server = createServer((req, res): void => {
    if (parse(req.url).pathname === '/metrics') {
      res.writeHead(200, { 'Content-Type': this.metrics.register.contentType });
      res.write(this.metrics.register.metrics());
    }
    res.end();
  });

  public listen(): void {
    this.server.listen(5000);
  }
}
