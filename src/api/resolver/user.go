package resolver

import (
	"context"

	"github.com/HichuYamichu/fetcher-api/fetcher"
)

type UserResolver struct {
	rpc  fetcher.GuildFetcherClient
	user *fetcher.User
}

func (u *UserResolver) Avatar(ctx context.Context) *string {
	return &u.user.Avatar
}

func (u *UserResolver) Id(ctx context.Context) *string {
	return &u.user.Id
}

func (u *UserResolver) Tag(ctx context.Context) *string {
	return &u.user.Tag
}
