import asyncio

from grpclib.utils import graceful_exit
from grpclib.server import Server, Stream

from fetcher_pb2 import ChatMessage
from fetcher_grpc import GuildChatterBase

from rasa.core.agent import Agent
agent = Agent.load('bot/models/current.tar.gz')

class Chatter(GuildChatterBase):

    async def send(self, stream: Stream[ChatMessage, ChatMessage]) -> None:
        request = await stream.recv_message()
        res = await agent.handle_text(request.content, sender_id=request.userID)
        content = ' '.join(el['text'] for el in res)
        print(content)
        
        await stream.send_message(ChatMessage(content=content))


async def main(*, host: str = '0.0.0.0', port: int = 50052) -> None:
    server = Server([Chatter()])
    with graceful_exit([server]):
        await server.start(host, port)
        print(f'Serving on {host}:{port}')
        await server.wait_closed()


if __name__ == '__main__':
    asyncio.run(main())
