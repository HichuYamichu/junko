package resolver

import (
	"context"

	"github.com/HichuYamichu/fetcher-api/fetcher"
)

// MemberResolver : resolves member
type MemberResolver struct {
	rpc    fetcher.GuildFetcherClient
	member *fetcher.Member
}

// DisplayName : resolves member DisplayName
func (m *MemberResolver) DisplayName(ctx context.Context) *string {
	return &m.member.DisplayName
}

// JoinedAt : resolves member JoinedAt
func (m *MemberResolver) JoinedAt(ctx context.Context) *string {
	return &m.member.JoinedAt
}

// Roles : resolves member Roles
func (m *MemberResolver) Roles(ctx context.Context) *[]string {
	return &m.member.XRoles
}

// User : resolves member User
func (m *MemberResolver) User(ctx context.Context) (*UserResolver, error) {
	r := &UserResolver{
		rpc:  m.rpc,
		user: m.member.User,
	}
	return r, nil
}
