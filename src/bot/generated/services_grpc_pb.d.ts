/* eslint-disable */
// GENERATED CODE -- DO NOT EDIT!

// package: fetcher
// file: proto/services.proto

import * as proto_services_pb from './services_pb';
import * as grpc from 'grpc';

interface IDescriptionFetcherService
  extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  fetchCategories: grpc.MethodDefinition<
    proto_services_pb.CategoriesRequest,
    proto_services_pb.CategoriesResponce
  >;
  fetchCommands: grpc.MethodDefinition<
    proto_services_pb.CommandsRequest,
    proto_services_pb.CommandsResponce
  >;
  fetchDescription: grpc.MethodDefinition<
    proto_services_pb.DescriptionRequest,
    proto_services_pb.DescriptionResponce
  >;
}

export const DescriptionFetcherService: IDescriptionFetcherService;

export class DescriptionFetcherClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  fetchCategories(
    argument: proto_services_pb.CategoriesRequest,
    callback: grpc.requestCallback<proto_services_pb.CategoriesResponce>
  ): grpc.ClientUnaryCall;
  fetchCategories(
    argument: proto_services_pb.CategoriesRequest,
    metadataOrOptions: grpc.Metadata | grpc.CallOptions | null,
    callback: grpc.requestCallback<proto_services_pb.CategoriesResponce>
  ): grpc.ClientUnaryCall;
  fetchCategories(
    argument: proto_services_pb.CategoriesRequest,
    metadata: grpc.Metadata | null,
    options: grpc.CallOptions | null,
    callback: grpc.requestCallback<proto_services_pb.CategoriesResponce>
  ): grpc.ClientUnaryCall;
  fetchCommands(
    argument: proto_services_pb.CommandsRequest,
    callback: grpc.requestCallback<proto_services_pb.CommandsResponce>
  ): grpc.ClientUnaryCall;
  fetchCommands(
    argument: proto_services_pb.CommandsRequest,
    metadataOrOptions: grpc.Metadata | grpc.CallOptions | null,
    callback: grpc.requestCallback<proto_services_pb.CommandsResponce>
  ): grpc.ClientUnaryCall;
  fetchCommands(
    argument: proto_services_pb.CommandsRequest,
    metadata: grpc.Metadata | null,
    options: grpc.CallOptions | null,
    callback: grpc.requestCallback<proto_services_pb.CommandsResponce>
  ): grpc.ClientUnaryCall;
  fetchDescription(
    argument: proto_services_pb.DescriptionRequest,
    callback: grpc.requestCallback<proto_services_pb.DescriptionResponce>
  ): grpc.ClientUnaryCall;
  fetchDescription(
    argument: proto_services_pb.DescriptionRequest,
    metadataOrOptions: grpc.Metadata | grpc.CallOptions | null,
    callback: grpc.requestCallback<proto_services_pb.DescriptionResponce>
  ): grpc.ClientUnaryCall;
  fetchDescription(
    argument: proto_services_pb.DescriptionRequest,
    metadata: grpc.Metadata | null,
    options: grpc.CallOptions | null,
    callback: grpc.requestCallback<proto_services_pb.DescriptionResponce>
  ): grpc.ClientUnaryCall;
}
