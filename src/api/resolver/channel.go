package resolver

import (
	"context"

	"github.com/hichuyamichu/fetcher-api/fetcher"
)

// ChannelResolver : rosolves channels
type ChannelResolver struct {
	rpc     *fetcher.GuildFetcherClient
	channel *fetcher.Channel
}

// ID : rosolves channel ID
func (c *ChannelResolver) ID(ctx context.Context) *string {
	return &c.channel.Id
}

// Name : resolves channel Name
func (c *ChannelResolver) Name(ctx context.Context) *string {
	return &c.channel.Name
}

// CreatedTimestamp : resolves channel CreatedTimestamp
func (c *ChannelResolver) CreatedTimestamp(ctx context.Context) *string {
	return &c.channel.CreatedTimestamp
}

// Type : resolves channel Type
func (c *ChannelResolver) Type(ctx context.Context) *string {
	return &c.channel.Type
}

// RawPosition : resolves channel RawPosition
func (c *ChannelResolver) RawPosition(ctx context.Context) *int32 {
	return &c.channel.RawPosition
}

// Topic : resolves channel Topic
func (c *ChannelResolver) Topic(ctx context.Context) *string {
	return &c.channel.Topic
}

// Nsfw : resolves channel Nsfw value
func (c *ChannelResolver) Nsfw(ctx context.Context) *bool {
	return &c.channel.Nsfw
}

// Bitrate : resolves channel Bitrate
func (c *ChannelResolver) Bitrate(ctx context.Context) *int32 {
	return &c.channel.Bitrate
}

// UserLimit : resolves channel UserLimit
func (c *ChannelResolver) UserLimit(ctx context.Context) *int32 {
	return &c.channel.UserLimit
}

// ParentID : resolves channel ParentID
func (c *ChannelResolver) ParentID(ctx context.Context) *string {
	return &c.channel.ParentID
}

// RateLimitPerUser : resolves channel RateLimitPerUser
func (c *ChannelResolver) RateLimitPerUser(ctx context.Context) *int32 {
	return &c.channel.RateLimitPerUser
}

// Guild : resolves channel Guild
func (c *ChannelResolver) Guild(ctx context.Context) (*GuildResolver, error) {
	guild, err := (*c.rpc).FetchGuild(ctx, &fetcher.ID{ID: c.channel.Guild})
	if err != nil {
		return nil, err
	}
	r := &GuildResolver{
		rpc:   c.rpc,
		guild: guild,
	}
	return r, nil
}
