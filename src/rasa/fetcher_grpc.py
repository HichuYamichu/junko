# Generated by the Protocol Buffers compiler. DO NOT EDIT!
# source: fetcher.proto
# plugin: grpclib.plugin.main
import abc
import typing

import grpclib.const
import grpclib.client
if typing.TYPE_CHECKING:
    import grpclib.server

import fetcher_pb2


class GuildFetcherBase(abc.ABC):

    @abc.abstractmethod
    async def fetchGuilds(self, stream: 'grpclib.server.Stream[fetcher_pb2.Void, fetcher_pb2.Guilds]') -> None:
        pass

    @abc.abstractmethod
    async def fetchGuild(self, stream: 'grpclib.server.Stream[fetcher_pb2.ID, fetcher_pb2.Guild]') -> None:
        pass

    @abc.abstractmethod
    async def fetchChannels(self, stream: 'grpclib.server.Stream[fetcher_pb2.MultiFetchRequest, fetcher_pb2.Channels]') -> None:
        pass

    @abc.abstractmethod
    async def fetchChannel(self, stream: 'grpclib.server.Stream[fetcher_pb2.SingleFetchRequest, fetcher_pb2.Channel]') -> None:
        pass

    @abc.abstractmethod
    async def fetchMembers(self, stream: 'grpclib.server.Stream[fetcher_pb2.MultiFetchRequest, fetcher_pb2.Members]') -> None:
        pass

    @abc.abstractmethod
    async def fetchMember(self, stream: 'grpclib.server.Stream[fetcher_pb2.SingleFetchRequest, fetcher_pb2.Member]') -> None:
        pass

    @abc.abstractmethod
    async def fetchRoles(self, stream: 'grpclib.server.Stream[fetcher_pb2.MultiFetchRequest, fetcher_pb2.Roles]') -> None:
        pass

    @abc.abstractmethod
    async def fetchRole(self, stream: 'grpclib.server.Stream[fetcher_pb2.SingleFetchRequest, fetcher_pb2.Role]') -> None:
        pass

    @abc.abstractmethod
    async def fetchUsers(self, stream: 'grpclib.server.Stream[fetcher_pb2.MultiFetchRequest, fetcher_pb2.Users]') -> None:
        pass

    @abc.abstractmethod
    async def fetchUser(self, stream: 'grpclib.server.Stream[fetcher_pb2.SingleFetchRequest, fetcher_pb2.User]') -> None:
        pass

    @abc.abstractmethod
    async def say(self, stream: 'grpclib.server.Stream[fetcher_pb2.Msg, fetcher_pb2.Void]') -> None:
        pass

    def __mapping__(self) -> typing.Dict[str, grpclib.const.Handler]:
        return {
            '/fetcher.GuildFetcher/fetchGuilds': grpclib.const.Handler(
                self.fetchGuilds,
                grpclib.const.Cardinality.UNARY_UNARY,
                fetcher_pb2.Void,
                fetcher_pb2.Guilds,
            ),
            '/fetcher.GuildFetcher/fetchGuild': grpclib.const.Handler(
                self.fetchGuild,
                grpclib.const.Cardinality.UNARY_UNARY,
                fetcher_pb2.ID,
                fetcher_pb2.Guild,
            ),
            '/fetcher.GuildFetcher/fetchChannels': grpclib.const.Handler(
                self.fetchChannels,
                grpclib.const.Cardinality.UNARY_UNARY,
                fetcher_pb2.MultiFetchRequest,
                fetcher_pb2.Channels,
            ),
            '/fetcher.GuildFetcher/fetchChannel': grpclib.const.Handler(
                self.fetchChannel,
                grpclib.const.Cardinality.UNARY_UNARY,
                fetcher_pb2.SingleFetchRequest,
                fetcher_pb2.Channel,
            ),
            '/fetcher.GuildFetcher/fetchMembers': grpclib.const.Handler(
                self.fetchMembers,
                grpclib.const.Cardinality.UNARY_UNARY,
                fetcher_pb2.MultiFetchRequest,
                fetcher_pb2.Members,
            ),
            '/fetcher.GuildFetcher/fetchMember': grpclib.const.Handler(
                self.fetchMember,
                grpclib.const.Cardinality.UNARY_UNARY,
                fetcher_pb2.SingleFetchRequest,
                fetcher_pb2.Member,
            ),
            '/fetcher.GuildFetcher/fetchRoles': grpclib.const.Handler(
                self.fetchRoles,
                grpclib.const.Cardinality.UNARY_UNARY,
                fetcher_pb2.MultiFetchRequest,
                fetcher_pb2.Roles,
            ),
            '/fetcher.GuildFetcher/fetchRole': grpclib.const.Handler(
                self.fetchRole,
                grpclib.const.Cardinality.UNARY_UNARY,
                fetcher_pb2.SingleFetchRequest,
                fetcher_pb2.Role,
            ),
            '/fetcher.GuildFetcher/fetchUsers': grpclib.const.Handler(
                self.fetchUsers,
                grpclib.const.Cardinality.UNARY_UNARY,
                fetcher_pb2.MultiFetchRequest,
                fetcher_pb2.Users,
            ),
            '/fetcher.GuildFetcher/fetchUser': grpclib.const.Handler(
                self.fetchUser,
                grpclib.const.Cardinality.UNARY_UNARY,
                fetcher_pb2.SingleFetchRequest,
                fetcher_pb2.User,
            ),
            '/fetcher.GuildFetcher/say': grpclib.const.Handler(
                self.say,
                grpclib.const.Cardinality.UNARY_UNARY,
                fetcher_pb2.Msg,
                fetcher_pb2.Void,
            ),
        }


class GuildFetcherStub:

    def __init__(self, channel: grpclib.client.Channel) -> None:
        self.fetchGuilds = grpclib.client.UnaryUnaryMethod(
            channel,
            '/fetcher.GuildFetcher/fetchGuilds',
            fetcher_pb2.Void,
            fetcher_pb2.Guilds,
        )
        self.fetchGuild = grpclib.client.UnaryUnaryMethod(
            channel,
            '/fetcher.GuildFetcher/fetchGuild',
            fetcher_pb2.ID,
            fetcher_pb2.Guild,
        )
        self.fetchChannels = grpclib.client.UnaryUnaryMethod(
            channel,
            '/fetcher.GuildFetcher/fetchChannels',
            fetcher_pb2.MultiFetchRequest,
            fetcher_pb2.Channels,
        )
        self.fetchChannel = grpclib.client.UnaryUnaryMethod(
            channel,
            '/fetcher.GuildFetcher/fetchChannel',
            fetcher_pb2.SingleFetchRequest,
            fetcher_pb2.Channel,
        )
        self.fetchMembers = grpclib.client.UnaryUnaryMethod(
            channel,
            '/fetcher.GuildFetcher/fetchMembers',
            fetcher_pb2.MultiFetchRequest,
            fetcher_pb2.Members,
        )
        self.fetchMember = grpclib.client.UnaryUnaryMethod(
            channel,
            '/fetcher.GuildFetcher/fetchMember',
            fetcher_pb2.SingleFetchRequest,
            fetcher_pb2.Member,
        )
        self.fetchRoles = grpclib.client.UnaryUnaryMethod(
            channel,
            '/fetcher.GuildFetcher/fetchRoles',
            fetcher_pb2.MultiFetchRequest,
            fetcher_pb2.Roles,
        )
        self.fetchRole = grpclib.client.UnaryUnaryMethod(
            channel,
            '/fetcher.GuildFetcher/fetchRole',
            fetcher_pb2.SingleFetchRequest,
            fetcher_pb2.Role,
        )
        self.fetchUsers = grpclib.client.UnaryUnaryMethod(
            channel,
            '/fetcher.GuildFetcher/fetchUsers',
            fetcher_pb2.MultiFetchRequest,
            fetcher_pb2.Users,
        )
        self.fetchUser = grpclib.client.UnaryUnaryMethod(
            channel,
            '/fetcher.GuildFetcher/fetchUser',
            fetcher_pb2.SingleFetchRequest,
            fetcher_pb2.User,
        )
        self.say = grpclib.client.UnaryUnaryMethod(
            channel,
            '/fetcher.GuildFetcher/say',
            fetcher_pb2.Msg,
            fetcher_pb2.Void,
        )


class GuildChatterBase(abc.ABC):

    @abc.abstractmethod
    async def send(self, stream: 'grpclib.server.Stream[fetcher_pb2.ChatMessage, fetcher_pb2.ChatMessage]') -> None:
        pass

    def __mapping__(self) -> typing.Dict[str, grpclib.const.Handler]:
        return {
            '/fetcher.GuildChatter/send': grpclib.const.Handler(
                self.send,
                grpclib.const.Cardinality.UNARY_UNARY,
                fetcher_pb2.ChatMessage,
                fetcher_pb2.ChatMessage,
            ),
        }


class GuildChatterStub:

    def __init__(self, channel: grpclib.client.Channel) -> None:
        self.send = grpclib.client.UnaryUnaryMethod(
            channel,
            '/fetcher.GuildChatter/send',
            fetcher_pb2.ChatMessage,
            fetcher_pb2.ChatMessage,
        )