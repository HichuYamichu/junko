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

// CreatedAt : resolves guild creation date
func (g *GuildResolver) CreatedAt(ctx context.Context) *string {
	return &g.guild.CreatedAt
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
	r := make([]*ChannelResolver, len(g.guild.Channels))
	for i := range g.guild.Channels {
		r[i] = &ChannelResolver{
			rpc:     g.rpc,
			channel: g.guild.Channels[i],
		}
	}
	return &r, nil
}

// Members : resolves guild Members
func (g *GuildResolver) Members(ctx context.Context) (*[]*MemberResolver, error) {
	r := make([]*MemberResolver, len(g.guild.Members))
	for i := range g.guild.Members {
		r[i] = &MemberResolver{
			rpc:    g.rpc,
			member: g.guild.Members[i],
		}
	}
	return &r, nil
}

// Roles : resolves guild Roles
func (g *GuildResolver) Roles(ctx context.Context) (*[]*RoleResolver, error) {
	r := make([]*RoleResolver, len(g.guild.Roles))
	for i := range g.guild.Roles {
		r[i] = &RoleResolver{
			rpc:  g.rpc,
			role: g.guild.Roles[i],
		}
	}
	return &r, nil
}
