package resolver

import (
	"context"

	"github.com/HichuYamichu/fetcher-api/fetcher"
)

type RoleResolver struct {
	rpc  fetcher.GuildFetcherClient
	role *fetcher.Role
}

func (r *RoleResolver) Color(ctx context.Context) *int32 {
	return &r.role.Color
}

func (r *RoleResolver) Name(ctx context.Context) *string {
	return &r.role.Name
}

func (r *RoleResolver) Position(ctx context.Context) *int32 {
	return &r.role.Position
}

func (r *RoleResolver) Id(ctx context.Context) *string {
	return &r.role.Id
}

func (r *RoleResolver) Permissions(ctx context.Context) *int32 {
	return &r.role.Permissions
}

func (r *RoleResolver) Hoist(ctx context.Context) *bool {
	return &r.role.Hoist
}
