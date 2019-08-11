const { join } = require('path');
const protoLoader = require('@grpc/proto-loader');
const protoPath = join(__dirname, '../..', 'api/api.proto');
const grpc = require('grpc');
const bluebird = require('bluebird');
const packageDefinition = protoLoader.loadSync(protoPath);
const serviceDeff = grpc.loadPackageDefinition(packageDefinition).api;

module.exports.createFetcherClient = () =>
  bluebird.promisifyAll(
    new serviceDeff.GuildFetcher(
      process.env.GRPC || 'localhost:50051',
      grpc.credentials.createInsecure()
    )
  );
