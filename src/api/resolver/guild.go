package resolver

import (
	"context"

	"github.com/hichuyamichu/fetcher-api/fetcher"
	"github.com/hichuyamichu/fetcher-api/models"
	"github.com/jinzhu/gorm"
)

// GuildResolver : resolves guild
type GuildResolver struct {
	rpc   *fetcher.GuildFetcherClient
	db    *gorm.DB
	guild *fetcher.Guild
}

// ID : resolves guild ID
func (g *GuildResolver) ID(ctx context.Context) *string {
	return &g.guild.Id
}

// Name : resolves guild Name
func (g *GuildResolver) Name(ctx context.Context) *string {
	return &g.guild.Name
}

// CreatedTimestamp : resolves guild CreatedTimestamp
func (g *GuildResolver) CreatedTimestamp(ctx context.Context) *string {
	return &g.guild.CreatedTimestamp
}

// Description : resolves guild Description
func (g *GuildResolver) Description(ctx context.Context) *string {
	return &g.guild.Description
}

// MemberCount : resolves guild MemberCount
func (g *GuildResolver) MemberCount(ctx context.Context) *int32 {
	return &g.guild.MemberCount
}

// Region : resolves guild Region
func (g *GuildResolver) Region(ctx context.Context) *string {
	return &g.guild.Region
}

// Icon : resolves guild Icon
func (g *GuildResolver) Icon(ctx context.Context) *string {
	return &g.guild.Icon
}

// Channels : resolves guild Channels
func (g *GuildResolver) Channels(ctx context.Context) (*[]*ChannelResolver, error) {
	r := make([]*ChannelResolver, len(g.guild.Channels))
	for i, id := range g.guild.Channels {
		fetched, err := (*g.rpc).FetchChannel(ctx, &fetcher.FetchRequest{GuildID: g.guild.Id, ID: id})
		if err != nil {
			return nil, err
		}
		r[i] = &ChannelResolver{
			channel: fetched,
		}
	}
	return &r, nil
}

// Members : resolves guild Members
func (g *GuildResolver) Members(ctx context.Context) (*[]*MemberResolver, error) {
	r := make([]*MemberResolver, len(g.guild.Members))
	for i, id := range g.guild.Members {
		fetched, err := (*g.rpc).FetchMember(ctx, &fetcher.FetchRequest{GuildID: g.guild.Id, ID: id})
		if err != nil {
			return nil, err
		}
		r[i] = &MemberResolver{
			rpc:    g.rpc,
			member: fetched,
		}
	}
	return &r, nil
}

// Roles : resolves guild Roles
func (g *GuildResolver) Roles(ctx context.Context) (*[]*RoleResolver, error) {
	r := make([]*RoleResolver, len(g.guild.Roles))
	for i, id := range g.guild.Roles {
		fetched, err := (*g.rpc).FetchRole(ctx, &fetcher.FetchRequest{GuildID: g.guild.Id, ID: id})
		if err != nil {
			return nil, err
		}
		r[i] = &RoleResolver{
			role: fetched,
		}
	}
	return &r, nil
}

// Settings : resolves guild Settings
func (g *GuildResolver) Settings(ctx context.Context) (*SettingsResolver, error) {
	var settings models.Settings
	settings.GuildID = g.guild.Id
	g.db.Where(&models.Settings{GuildID: g.guild.Id}).Find(&settings)

	r := &SettingsResolver{
		db:       g.db,
		settings: &settings,
	}

	return r, nil
}

// Tags : resolves guild Tags
func (g *GuildResolver) Tags(ctx context.Context) (*[]*TagResolver, error) {
	var tags []models.Tag
	g.db.Where(&models.Tag{GuildID: g.guild.Id}).Find(&tags)

	r := make([]*TagResolver, len(tags))
	for i := range tags {
		r[i] = &TagResolver{
			db:  g.db,
			tag: &tags[i],
		}
	}

	return &r, nil
}
