package resolver

import (
	"context"

	"github.com/HichuYamichu/fetcher-api/fetcher"
)

// RoleResolver : resolves role
type RoleResolver struct {
	rpc  fetcher.GuildFetcherClient
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

// Position : resolves role Position
func (r *RoleResolver) Position(ctx context.Context) *int32 {
	return &r.role.Position
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
