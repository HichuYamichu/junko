package resolver

import (
	"context"

	"github.com/HichuYamichu/fetcher-api/fetcher"
)

type MemberResolver struct {
	rpc    fetcher.GuildFetcherClient
	member *fetcher.Member
}

func (m *MemberResolver) DisplayName(ctx context.Context) *string {
	return &m.member.DisplayName
}

func (m *MemberResolver) JoinedAt(ctx context.Context) *string {
	return &m.member.JoinedAt
}

func (m *MemberResolver) Roles(ctx context.Context) *[]string {
	return &m.member.XRoles
}

func (m *MemberResolver) User(ctx context.Context) (*UserResolver, error) {
	r := &UserResolver{
		rpc:  m.rpc,
		user: m.member.User,
	}
	return r, nil
}
