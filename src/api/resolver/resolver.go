package resolver

import (
	"context"

	"github.com/hichuyamichu/fetcher-api/fetcher"
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
func (r *Resolver) Guild(ctx context.Context, args fetcher.ID) (*GuildResolver, error) {
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

// Channel : resolves Channel query
func (r *Resolver) Channel(ctx context.Context, args fetcher.SingleFetchRequest) (*ChannelResolver, error) {
	channel, err := (*r.RPC).FetchChannel(ctx, &args)
	if err != nil {
		return nil, err
	}

	res := ChannelResolver{
		rpc:     r.RPC,
		channel: channel,
	}

	return &res, nil
}

// Member : resolves Member query
func (r *Resolver) Member(ctx context.Context, args fetcher.SingleFetchRequest) (*MemberResolver, error) {
	member, err := (*r.RPC).FetchMember(ctx, &args)
	if err != nil {
		return nil, err
	}

	res := MemberResolver{
		rpc:    r.RPC,
		member: member,
	}

	return &res, nil
}

// Role : resolves Role query
func (r *Resolver) Role(ctx context.Context, args fetcher.SingleFetchRequest) (*RoleResolver, error) {
	role, err := (*r.RPC).FetchRole(ctx, &args)
	if err != nil {
		return nil, err
	}

	res := RoleResolver{
		rpc:  r.RPC,
		role: role,
	}

	return &res, nil
}

// User : resolves User query
func (r *Resolver) User(ctx context.Context, args fetcher.SingleFetchRequest) (*UserResolver, error) {
	user, err := (*r.RPC).FetchUser(ctx, &args)
	if err != nil {
		return nil, err
	}

	res := UserResolver{
		rpc:  r.RPC,
		user: user,
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

// LogsArgs : arguments for Logs
type LogsArgs struct {
	Source string
	Start  int32
	Stop   int32
}
