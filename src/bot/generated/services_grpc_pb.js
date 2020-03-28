// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var proto_services_pb = require('./services_pb.js');

function serialize_fetcher_CategoriesRequest(arg) {
  if (!(arg instanceof proto_services_pb.CategoriesRequest)) {
    throw new Error('Expected argument of type fetcher.CategoriesRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_fetcher_CategoriesRequest(buffer_arg) {
  return proto_services_pb.CategoriesRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_fetcher_CategoriesResponce(arg) {
  if (!(arg instanceof proto_services_pb.CategoriesResponce)) {
    throw new Error('Expected argument of type fetcher.CategoriesResponce');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_fetcher_CategoriesResponce(buffer_arg) {
  return proto_services_pb.CategoriesResponce.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_fetcher_CommandsRequest(arg) {
  if (!(arg instanceof proto_services_pb.CommandsRequest)) {
    throw new Error('Expected argument of type fetcher.CommandsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_fetcher_CommandsRequest(buffer_arg) {
  return proto_services_pb.CommandsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_fetcher_CommandsResponce(arg) {
  if (!(arg instanceof proto_services_pb.CommandsResponce)) {
    throw new Error('Expected argument of type fetcher.CommandsResponce');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_fetcher_CommandsResponce(buffer_arg) {
  return proto_services_pb.CommandsResponce.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_fetcher_DescriptionRequest(arg) {
  if (!(arg instanceof proto_services_pb.DescriptionRequest)) {
    throw new Error('Expected argument of type fetcher.DescriptionRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_fetcher_DescriptionRequest(buffer_arg) {
  return proto_services_pb.DescriptionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_fetcher_DescriptionResponce(arg) {
  if (!(arg instanceof proto_services_pb.DescriptionResponce)) {
    throw new Error('Expected argument of type fetcher.DescriptionResponce');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_fetcher_DescriptionResponce(buffer_arg) {
  return proto_services_pb.DescriptionResponce.deserializeBinary(new Uint8Array(buffer_arg));
}


var DescriptionFetcherService = exports.DescriptionFetcherService = {
  fetchCategories: {
    path: '/fetcher.DescriptionFetcher/fetchCategories',
    requestStream: false,
    responseStream: false,
    requestType: proto_services_pb.CategoriesRequest,
    responseType: proto_services_pb.CategoriesResponce,
    requestSerialize: serialize_fetcher_CategoriesRequest,
    requestDeserialize: deserialize_fetcher_CategoriesRequest,
    responseSerialize: serialize_fetcher_CategoriesResponce,
    responseDeserialize: deserialize_fetcher_CategoriesResponce,
  },
  fetchCommands: {
    path: '/fetcher.DescriptionFetcher/fetchCommands',
    requestStream: false,
    responseStream: false,
    requestType: proto_services_pb.CommandsRequest,
    responseType: proto_services_pb.CommandsResponce,
    requestSerialize: serialize_fetcher_CommandsRequest,
    requestDeserialize: deserialize_fetcher_CommandsRequest,
    responseSerialize: serialize_fetcher_CommandsResponce,
    responseDeserialize: deserialize_fetcher_CommandsResponce,
  },
  fetchDescription: {
    path: '/fetcher.DescriptionFetcher/fetchDescription',
    requestStream: false,
    responseStream: false,
    requestType: proto_services_pb.DescriptionRequest,
    responseType: proto_services_pb.DescriptionResponce,
    requestSerialize: serialize_fetcher_DescriptionRequest,
    requestDeserialize: deserialize_fetcher_DescriptionRequest,
    responseSerialize: serialize_fetcher_DescriptionResponce,
    responseDeserialize: deserialize_fetcher_DescriptionResponce,
  },
};

exports.DescriptionFetcherClient = grpc.makeGenericClientConstructor(DescriptionFetcherService);
