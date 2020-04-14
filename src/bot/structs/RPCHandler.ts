import JunkoClient from '../client/JunkoClient';
import { ServerUnaryCall, sendUnaryData } from 'grpc';
import {
  CommandsRequest,
  CommandsResponce,
  Command,
  Category
} from '../generated/junko_pb';
import { IJunkoServer } from '../generated/junko_grpc_pb';

export class RPCHandler implements IJunkoServer {
  public constructor(private readonly client: JunkoClient) {}

  public getCommands(
    call: ServerUnaryCall<CommandsRequest>,
    callback: sendUnaryData<CommandsResponce>
  ) {
    const res = new CommandsResponce();
    const categoryNames = this.client.commandHandler.categories.keys();
    for (const catName of categoryNames) {
      const categoryMessage = new Category();
      categoryMessage.setName(catName);
      const cmdNames = this.client.commandHandler.findCategory(catName).keys();
      for (const cmdName of cmdNames) {
        const cmd = this.client.commandHandler.modules.get(cmdName);
        if (!cmd || !cmd.description) continue;
        const commandMessage = new Command();
        commandMessage.setName(cmdName);
        commandMessage.setContent(cmd.description.content);
        commandMessage.setUsage(cmd.description.usage);
        commandMessage.setExamplesList(cmd.description.examples);
        categoryMessage.addCommands(commandMessage);
      }
      res.addCategories(categoryMessage);
    }
    callback(null, res);
  }
}
