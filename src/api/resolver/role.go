package resolver

import (
	"context"

	"github.com/hichuyamichu/fetcher-api/fetcher"
)

// RoleResolver : resolves role
type RoleResolver struct {
	rpc  *fetcher.GuildFetcherClient
	role *fetcher.Role
}

// Color : resolves role Color
func (r *RoleResolver) Color(ctx context.Context) *int32 {
	return &r.role.Color
}

// Name : resolves role Name
func (r *RoleResolver) Name(ctx context.Context) *string {
	return &r.role.Name
}

// RawPosition : resolves role RawPosition
func (r *RoleResolver) RawPosition(ctx context.Context) *int32 {
	return &r.role.RawPosition
}

// ID : resolves role Id
func (r *RoleResolver) ID(ctx context.Context) *string {
	return &r.role.Id
}

// Permissions : resolves role Permissions
func (r *RoleResolver) Permissions(ctx context.Context) *int32 {
	return &r.role.Permissions
}

// Hoist : resolves role Hoist
func (r *RoleResolver) Hoist(ctx context.Context) *bool {
	return &r.role.Hoist
}

// Guild : resolves role Guild
func (r *RoleResolver) Guild(ctx context.Context) (*GuildResolver, error) {
	guild, err := (*r.rpc).FetchGuild(ctx, &fetcher.ID{ID: r.role.Guild})
	if err != nil {
		return nil, err
	}
	res := &GuildResolver{
		rpc:   r.rpc,
		guild: guild,
	}
	return res, nil
}
