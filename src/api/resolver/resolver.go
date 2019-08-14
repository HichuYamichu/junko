package resolver

import (
	"context"

	"github.com/HichuYamichu/fetcher-api/fetcher"
	"github.com/go-redis/redis"
)

// Resolver : root resolver
type Resolver struct {
	RPC fetcher.GuildFetcherClient
	DB  *redis.Client
}

// NewResolver : Resolver constructor function
func NewResolver(rpc fetcher.GuildFetcherClient, db *redis.Client) *Resolver {
	return &Resolver{RPC: rpc, DB: db}
}

// FetchGuilds : resolves FetchGuilds query
func (r *Resolver) FetchGuilds(ctx context.Context, args fetcher.GuildRequest) (*[]*GuildResolver, error) {
	query := ctx.Value("query").(string)
	fetched, err := r.RPC.FetchGuilds(ctx, &fetcher.GuildRequest{Id: args.Id, Gql: query})
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

// Say : resolves Say query
func (r *Resolver) Say(ctx context.Context, args fetcher.Msg) (*string, error) {
	_, err := r.RPC.Say(ctx, &args)
	if err != nil {
		res := "Failed to send"
		return &res, err
	}
	res := "Message sent successfully"
	return &res, nil
}
