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
	fetched, err := (*m.rpc).FetchRoles(ctx, &fetcher.MultiFetchRequest{GuildID: m.member.GuildID, IDs: m.member.Roles})
	if err != nil {
		return nil, err
	}
	r := make([]*RoleResolver, len(fetched.Roles))
	for i := range fetched.Roles {
		r[i] = &RoleResolver{
			rpc:  m.rpc,
			role: fetched.Roles[i],
		}
	}
	return &r, nil
}

// User : resolves member User
func (m *MemberResolver) User(ctx context.Context) (*UserResolver, error) {
	user, err := (*m.rpc).FetchUser(ctx, &fetcher.SingleFetchRequest{GuildID: m.member.GuildID, ID: m.member.UserID})
	if err != nil {
		return nil, err
	}
	r := &UserResolver{
		rpc:  m.rpc,
		user: user,
	}
	return r, nil
}

// Guild : resolves member Guild
func (m *MemberResolver) Guild(ctx context.Context) (*GuildResolver, error) {
	guild, err := (*m.rpc).FetchGuild(ctx, &fetcher.ID{ID: m.member.GuildID})
	if err != nil {
		return nil, err
	}
	r := &GuildResolver{
		rpc:   m.rpc,
		guild: guild,
	}
	return r, nil
}
