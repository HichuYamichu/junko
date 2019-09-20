package resolver

import (
	"context"

	"github.com/hichuyamichu/fetcher-api/fetcher"
)

// MemberResolver : resolves member
type MemberResolver struct {
	rpc    *fetcher.GuildFetcherClient
	member *fetcher.Member
}

// DisplayName : resolves member DisplayName
func (m *MemberResolver) DisplayName(ctx context.Context) *string {
	return &m.member.DisplayName
}

// JoinedTimestamp : resolves member JoinedTimestamp
func (m *MemberResolver) JoinedTimestamp(ctx context.Context) *int32 {
	return &m.member.JoinedTimestamp
}

// GuildID : resolves member GuildID
func (m *MemberResolver) GuildID(ctx context.Context) *string {
	return &m.member.GuildID
}

// Roles : resolves member Roles
func (m *MemberResolver) Roles(ctx context.Context) (*[]*RoleResolver, error) {
	r := make([]*RoleResolver, len(m.member.Roles))
	for i, id := range m.member.Roles {
		fetched, err := (*m.rpc).FetchRole(ctx, &fetcher.FetchRequest{GuildID: m.member.GuildID, ID: id})
		if err != nil {
			return nil, err
		}
		r[i] = &RoleResolver{
			role: fetched,
		}
	}
	return &r, nil
}

// User : resolves member User
func (m *MemberResolver) User(ctx context.Context) (*UserResolver, error) {
	user, err := (*m.rpc).FetchUser(ctx, &fetcher.FetchRequest{GuildID: m.member.GuildID, ID: m.member.UserID})
	if err != nil {
		return nil, err
	}
	r := &UserResolver{
		user: user,
	}
	return r, nil
}
