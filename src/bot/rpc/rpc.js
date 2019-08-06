const { join } = require('path');
const protoPath = join(__dirname, '../..', 'api/service.proto');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(protoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});
const serviceDeff = grpc.loadPackageDefinition(packageDefinition).api;

class IPC extends grpc.Server {
  constructor(methods) {
    super();
    this.addService(serviceDeff.Fetcher.service, methods);
    this.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
    this.start();
  }
}

module.exports = IPC;
