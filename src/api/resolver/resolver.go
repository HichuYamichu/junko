package resolver

import (
	"context"

	"github.com/hichuyamichu/junko-api/fetcher"
	"github.com/jinzhu/gorm"
)

// Resolver : root resolver
type Resolver struct {
	RPC *fetcher.GuildFetcherClient
	DB  *gorm.DB
}

// Guilds : resolves Guilds query
func (r *Resolver) Guilds(ctx context.Context) (*[]*GuildResolver, error) {
	fetched, err := (*r.RPC).FetchGuilds(ctx, &fetcher.Void{})
	if err != nil {
		return nil, err
	}
	res := make([]*GuildResolver, len(fetched.Guilds))
	for i := range fetched.Guilds {
		res[i] = &GuildResolver{
			rpc:   r.RPC,
			db:    r.DB,
			guild: fetched.Guilds[i],
		}
	}

	return &res, nil
}

// Guild : resolves Guild query
func (r *Resolver) Guild(ctx context.Context, args fetcher.FetchRequest) (*GuildResolver, error) {
	guild, err := (*r.RPC).FetchGuild(ctx, &args)
	if err != nil {
		return nil, err
	}
	res := GuildResolver{
		rpc:   r.RPC,
		db:    r.DB,
		guild: guild,
	}

	return &res, nil
}

// Say : resolves Say query
func (r *Resolver) Say(ctx context.Context, args fetcher.Msg) (*string, error) {
	_, err := (*r.RPC).Say(ctx, &args)
	if err != nil {
		res := "Failed to send"
		return &res, err
	}
	res := "Message sent successfully"
	return &res, nil
}
