package context

import (
	"github.com/HichuYamichu/fetcher-api/fetcher"
	"github.com/go-redis/redis"
)

type Context struct {
	DB  *redis.Client
	RPC fetcher.GuildFetcherClient
}

func NewContext(db *redis.Client, rpc fetcher.GuildFetcherClient) *Context {
	c := &Context{
		DB:  db,
		RPC: rpc,
	}
	return c
}
