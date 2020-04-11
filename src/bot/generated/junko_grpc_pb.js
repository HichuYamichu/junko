// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var junko_pb = require('./junko_pb.js');

function serialize_junko_CommandsRequest(arg) {
  if (!(arg instanceof junko_pb.CommandsRequest)) {
    throw new Error('Expected argument of type junko.CommandsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_junko_CommandsRequest(buffer_arg) {
  return junko_pb.CommandsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_junko_CommandsResponce(arg) {
  if (!(arg instanceof junko_pb.CommandsResponce)) {
    throw new Error('Expected argument of type junko.CommandsResponce');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_junko_CommandsResponce(buffer_arg) {
  return junko_pb.CommandsResponce.deserializeBinary(new Uint8Array(buffer_arg));
}


var JunkoService = exports.JunkoService = {
  getCommands: {
    path: '/junko.Junko/getCommands',
    requestStream: false,
    responseStream: false,
    requestType: junko_pb.CommandsRequest,
    responseType: junko_pb.CommandsResponce,
    requestSerialize: serialize_junko_CommandsRequest,
    requestDeserialize: deserialize_junko_CommandsRequest,
    responseSerialize: serialize_junko_CommandsResponce,
    responseDeserialize: deserialize_junko_CommandsResponce,
  },
};

exports.JunkoClient = grpc.makeGenericClientConstructor(JunkoService);
