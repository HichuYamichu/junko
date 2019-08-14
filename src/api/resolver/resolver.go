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

// New : Resolver constructor function
func New(rpc fetcher.GuildFetcherClient, db *redis.Client) *Resolver {
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

// FetchGuild : resolves FetchGuild query
func (r *Resolver) FetchGuild(ctx context.Context, args struct{ ID string }) (*GuildResolver, error) {
	query := ctx.Value("query").(string)
	id := []string{args.ID}
	guild, err := r.RPC.FetchGuild(ctx, &fetcher.GuildRequest{Id: id, Gql: query})
	if err != nil {
		return nil, err
	}

	res := GuildResolver{
		rpc:   r.RPC,
		guild: guild,
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

// FetchLogsArgs : arguments for FetchLogs
type FetchLogsArgs struct {
	Source string
	Start  int32
	Stop   int32
}

// FetchLogs : resolves FetchLogs query
func (r *Resolver) FetchLogs(ctx context.Context, args FetchLogsArgs) (*LogResolver, error) {
	logs := r.DB.LRange(args.Source, int64(args.Start), int64(args.Stop))
	res := &LogResolver{
		logs: logs,
	}

	return res, nil
}
