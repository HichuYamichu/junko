package resolver

import (
	"context"

	"github.com/HichuYamichu/fetcher-api/fetcher"
)

type ChannelResolver struct {
	rpc     fetcher.GuildFetcherClient
	channel *fetcher.Channel
}

func (c *ChannelResolver) ID(ctx context.Context) *string {
	return &c.channel.Id
}

func (c *ChannelResolver) Name(ctx context.Context) *string {
	return &c.channel.Name
}

func (c *ChannelResolver) CreatedAt(ctx context.Context) *string {
	return &c.channel.CreatedAt
}

func (c *ChannelResolver) Type(ctx context.Context) *string {
	return &c.channel.Type
}

func (c *ChannelResolver) Position(ctx context.Context) *int32 {
	return &c.channel.Position
}

func (c *ChannelResolver) Topic(ctx context.Context) *string {
	return &c.channel.Topic
}

func (c *ChannelResolver) Nsfw(ctx context.Context) *bool {
	return &c.channel.Nsfw
}

func (c *ChannelResolver) Bitrate(ctx context.Context) *int32 {
	return &c.channel.Bitrate
}

func (c *ChannelResolver) UserLimit(ctx context.Context) *int32 {
	return &c.channel.UserLimit
}

func (c *ChannelResolver) ParentID(ctx context.Context) *string {
	return &c.channel.ParentID
}

func (c *ChannelResolver) RateLimitPerUser(ctx context.Context) *int32 {
	return &c.channel.RateLimitPerUser
}
