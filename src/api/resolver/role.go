package resolver

import (
	"context"

	"github.com/hichuyamichu/junko-api/fetcher"
)

// RoleResolver : resolves role
type RoleResolver struct {
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
