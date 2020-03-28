// package: fetcher
// file: proto/services.proto

import * as jspb from "google-protobuf";

export class CategoriesRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CategoriesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CategoriesRequest): CategoriesRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CategoriesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CategoriesRequest;
  static deserializeBinaryFromReader(message: CategoriesRequest, reader: jspb.BinaryReader): CategoriesRequest;
}

export namespace CategoriesRequest {
  export type AsObject = {
  }
}

export class CategoriesResponce extends jspb.Message {
  clearCategorynamesList(): void;
  getCategorynamesList(): Array<string>;
  setCategorynamesList(value: Array<string>): void;
  addCategorynames(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CategoriesResponce.AsObject;
  static toObject(includeInstance: boolean, msg: CategoriesResponce): CategoriesResponce.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CategoriesResponce, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CategoriesResponce;
  static deserializeBinaryFromReader(message: CategoriesResponce, reader: jspb.BinaryReader): CategoriesResponce;
}

export namespace CategoriesResponce {
  export type AsObject = {
    categorynamesList: Array<string>,
  }
}

export class CommandsRequest extends jspb.Message {
  getCategoryname(): string;
  setCategoryname(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CommandsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CommandsRequest): CommandsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CommandsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CommandsRequest;
  static deserializeBinaryFromReader(message: CommandsRequest, reader: jspb.BinaryReader): CommandsRequest;
}

export namespace CommandsRequest {
  export type AsObject = {
    categoryname: string,
  }
}

export class CommandsResponce extends jspb.Message {
  clearCommandnamesList(): void;
  getCommandnamesList(): Array<string>;
  setCommandnamesList(value: Array<string>): void;
  addCommandnames(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CommandsResponce.AsObject;
  static toObject(includeInstance: boolean, msg: CommandsResponce): CommandsResponce.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CommandsResponce, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CommandsResponce;
  static deserializeBinaryFromReader(message: CommandsResponce, reader: jspb.BinaryReader): CommandsResponce;
}

export namespace CommandsResponce {
  export type AsObject = {
    commandnamesList: Array<string>,
  }
}

export class DescriptionRequest extends jspb.Message {
  getCommandname(): string;
  setCommandname(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DescriptionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DescriptionRequest): DescriptionRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DescriptionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DescriptionRequest;
  static deserializeBinaryFromReader(message: DescriptionRequest, reader: jspb.BinaryReader): DescriptionRequest;
}

export namespace DescriptionRequest {
  export type AsObject = {
    commandname: string,
  }
}

export class DescriptionResponce extends jspb.Message {
  getContent(): string;
  setContent(value: string): void;

  getUsage(): string;
  setUsage(value: string): void;

  clearExamplesList(): void;
  getExamplesList(): Array<string>;
  setExamplesList(value: Array<string>): void;
  addExamples(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DescriptionResponce.AsObject;
  static toObject(includeInstance: boolean, msg: DescriptionResponce): DescriptionResponce.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DescriptionResponce, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DescriptionResponce;
  static deserializeBinaryFromReader(message: DescriptionResponce, reader: jspb.BinaryReader): DescriptionResponce;
}

export namespace DescriptionResponce {
  export type AsObject = {
    content: string,
    usage: string,
    examplesList: Array<string>,
  }
}

