// package: junko
// file: junko.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class CommandsRequest extends jspb.Message { 

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
    }
}

export class CommandsResponce extends jspb.Message { 
    clearCategoriesList(): void;
    getCategoriesList(): Array<Category>;
    setCategoriesList(value: Array<Category>): void;
    addCategories(value?: Category, index?: number): Category;


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
        categoriesList: Array<Category.AsObject>,
    }
}

export class Category extends jspb.Message { 
    getName(): string;
    setName(value: string): void;

    clearCommandsList(): void;
    getCommandsList(): Array<Command>;
    setCommandsList(value: Array<Command>): void;
    addCommands(value?: Command, index?: number): Command;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Category.AsObject;
    static toObject(includeInstance: boolean, msg: Category): Category.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Category, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Category;
    static deserializeBinaryFromReader(message: Category, reader: jspb.BinaryReader): Category;
}

export namespace Category {
    export type AsObject = {
        name: string,
        commandsList: Array<Command.AsObject>,
    }
}

export class Command extends jspb.Message { 
    getName(): string;
    setName(value: string): void;

    getContent(): string;
    setContent(value: string): void;

    getUsage(): string;
    setUsage(value: string): void;

    clearExamplesList(): void;
    getExamplesList(): Array<string>;
    setExamplesList(value: Array<string>): void;
    addExamples(value: string, index?: number): string;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Command.AsObject;
    static toObject(includeInstance: boolean, msg: Command): Command.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Command, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Command;
    static deserializeBinaryFromReader(message: Command, reader: jspb.BinaryReader): Command;
}

export namespace Command {
    export type AsObject = {
        name: string,
        content: string,
        usage: string,
        examplesList: Array<string>,
    }
}
