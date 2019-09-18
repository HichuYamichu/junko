const { collectDefaultMetrics, Counter, Histogram, register } = require('prom-client');
const { createServer } = require('http');
const { parse } = require('url');
collectDefaultMetrics();

module.exports = class Prometheus {
  constructor() {
    this.metrics = {
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

    this.server = createServer((req, res) => {
      if (parse(req.url).pathname === '/metrics') {
        res.writeHead(200, { 'Content-Type': this.metrics.register.contentType });
        res.write(this.metrics.register.metrics());
      }
      res.end();
    });

    this.rpcMiddleware = async (ctx, next) => {
      const startEpoch = Date.now();
      this.metrics.grpcServerStartedTotal.labels(ctx.type, ctx.name).inc();
      await next();
      this.metrics.grpcServerHandledTotal.labels(ctx.type, ctx.name).inc();
      this.metrics.grpcServerHandleTime.labels(ctx.type, ctx.name).observe(Date.now() - startEpoch);
    };
  }

  listen() {
    this.server.listen(5000);
  }
};
