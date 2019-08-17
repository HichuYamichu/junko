package resolver

import (
	"context"

	"github.com/HichuYamichu/fetcher-api/fetcher"
)

// GuildResolver : resolves guild
type GuildResolver struct {
	rpc   fetcher.GuildFetcherClient
	guild *fetcher.Guild
}

// ID : resolves guild ID
func (g *GuildResolver) ID(ctx context.Context) *string {
	return &g.guild.Id
}

// Name : resolves guild Name
func (g *GuildResolver) Name(ctx context.Context) *string {
	return &g.guild.Name
}

// CreatedTimestamp : resolves guild CreatedTimestamp
func (g *GuildResolver) CreatedTimestamp(ctx context.Context) *string {
	return &g.guild.CreatedTimestamp
}

// Description : resolves guild Description
func (g *GuildResolver) Description(ctx context.Context) *string {
	return &g.guild.Description
}

// MemberCount : resolves guild MemberCount
func (g *GuildResolver) MemberCount(ctx context.Context) *int32 {
	return &g.guild.MemberCount
}

// Region : resolves guild Region
func (g *GuildResolver) Region(ctx context.Context) *string {
	return &g.guild.Region
}

// Icon : resolves guild Icon
func (g *GuildResolver) Icon(ctx context.Context) *string {
	return &g.guild.Icon
}

// Channels : resolves guild Channels
func (g *GuildResolver) Channels(ctx context.Context) (*[]*ChannelResolver, error) {
	fetched, err := g.rpc.FetchChannels(ctx, &fetcher.MultiFetchRequest{GuildID: g.guild.Id, IDs: g.guild.Channels})
	if err != nil {
		return nil, err
	}
	r := make([]*ChannelResolver, len(fetched.Channels))
	for i := range fetched.Channels {
		r[i] = &ChannelResolver{
			rpc:     g.rpc,
			channel: fetched.Channels[i],
		}
	}
	return &r, nil
}

// Members : resolves guild Members
func (g *GuildResolver) Members(ctx context.Context) (*[]*MemberResolver, error) {
	fetched, err := g.rpc.FetchMembers(ctx, &fetcher.MultiFetchRequest{GuildID: g.guild.Id, IDs: g.guild.Members})
	if err != nil {
		return nil, err
	}
	r := make([]*MemberResolver, len(fetched.Members))
	for i := range fetched.Members {
		r[i] = &MemberResolver{
			rpc:    g.rpc,
			member: fetched.Members[i],
		}
	}
	return &r, nil
}

// Roles : resolves guild Roles
func (g *GuildResolver) Roles(ctx context.Context) (*[]*RoleResolver, error) {
	fetched, err := g.rpc.FetchRoles(ctx, &fetcher.MultiFetchRequest{GuildID: g.guild.Id, IDs: g.guild.Roles})
	if err != nil {
		return nil, err
	}
	r := make([]*RoleResolver, len(fetched.Roles))
	for i := range fetched.Roles {
		r[i] = &RoleResolver{
			rpc:  g.rpc,
			role: fetched.Roles[i],
		}
	}
	return &r, nil
}
