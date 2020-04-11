import JunkoClient from '../client/JunkoClient';
import { ServerUnaryCall, sendUnaryData } from 'grpc';
import {
  CommandsRequest,
  CommandsResponce,
  Command
} from '../generated/junko_pb';
import { IJunkoServer } from '../generated/junko_grpc_pb';

export class RPCHandler implements IJunkoServer {
  public constructor(private readonly client: JunkoClient) {}

  public getCommands(
    call: ServerUnaryCall<CommandsRequest>,
    callback: sendUnaryData<CommandsResponce>
  ) {
    const commands = [...this.client.commandHandler.modules.values()];
    const res = new CommandsResponce();
    for (const command of commands) {
      const commandMessage = new Command();
      commandMessage.setCategory(command.categoryID);
      commandMessage.setContent(command.description.content);
      commandMessage.setUsage(command.description.usage);
      commandMessage.setExamplesList(command.description.examples);
      res.addCommands(commandMessage);
    }

    callback(null, res);
  }
}
