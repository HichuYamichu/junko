// package: junko
// file: junko.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as junko_pb from "./junko_pb";

interface IJunkoService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getCommands: IJunkoService_IgetCommands;
}

interface IJunkoService_IgetCommands extends grpc.MethodDefinition<junko_pb.CommandsRequest, junko_pb.CommandsResponce> {
    path: string; // "/junko.Junko/getCommands"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<junko_pb.CommandsRequest>;
    requestDeserialize: grpc.deserialize<junko_pb.CommandsRequest>;
    responseSerialize: grpc.serialize<junko_pb.CommandsResponce>;
    responseDeserialize: grpc.deserialize<junko_pb.CommandsResponce>;
}

export const JunkoService: IJunkoService;

export interface IJunkoServer {
    getCommands: grpc.handleUnaryCall<junko_pb.CommandsRequest, junko_pb.CommandsResponce>;
}

export interface IJunkoClient {
    getCommands(request: junko_pb.CommandsRequest, callback: (error: grpc.ServiceError | null, response: junko_pb.CommandsResponce) => void): grpc.ClientUnaryCall;
    getCommands(request: junko_pb.CommandsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: junko_pb.CommandsResponce) => void): grpc.ClientUnaryCall;
    getCommands(request: junko_pb.CommandsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: junko_pb.CommandsResponce) => void): grpc.ClientUnaryCall;
}

export class JunkoClient extends grpc.Client implements IJunkoClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public getCommands(request: junko_pb.CommandsRequest, callback: (error: grpc.ServiceError | null, response: junko_pb.CommandsResponce) => void): grpc.ClientUnaryCall;
    public getCommands(request: junko_pb.CommandsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: junko_pb.CommandsResponce) => void): grpc.ClientUnaryCall;
    public getCommands(request: junko_pb.CommandsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: junko_pb.CommandsResponce) => void): grpc.ClientUnaryCall;
}
