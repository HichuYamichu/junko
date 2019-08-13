package resolver

import (
	"context"

	"github.com/HichuYamichu/fetcher-api/fetcher"
	"github.com/go-redis/redis"
)

type Resolver struct {
	RPC fetcher.GuildFetcherClient
	DB  *redis.Client
}

func NewResolver(rpc fetcher.GuildFetcherClient, db *redis.Client) *Resolver {
	return &Resolver{RPC: rpc, DB: db}
}

func (r *Resolver) FetchGuilds(ctx context.Context) (*[]*GuildResolver, error) {
	fetched, err := r.RPC.FetchGuilds(ctx, &fetcher.Void{})
	if err != nil {
		return nil, err
	}
	res := make([]*GuildResolver, len(fetched.Guilds))
	for i := range fetched.Guilds {
		res[i] = &GuildResolver{
			rpc:   r.RPC,
			guild: fetched.Guilds[i],
		}
	}

	return &res, nil
}

func (r *Resolver) FetchGuild(ctx context.Context, id fetcher.ID) (*GuildResolver, error) {
	guild, err := r.RPC.FetchGuild(ctx, &id)
	if err != nil {
		return nil, err
	}

	guildRes := GuildResolver{
		rpc:   r.RPC,
		guild: guild,
	}

	return &guildRes, nil
}
