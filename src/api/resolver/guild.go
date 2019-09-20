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
	fetched, err := (*g.rpc).FetchChannels(ctx, &fetcher.MultiFetchRequest{GuildID: g.guild.Id, IDs: g.guild.Channels})
	if err != nil {
		return nil, err
	}
	r := make([]*ChannelResolver, len(fetched.Channels))
	for i := range fetched.Channels {
		r[i] = &ChannelResolver{
			rpc:     g.rpc,
			channel: fetched.Channels[i],
		}
	}
	return &r, nil
}

// Members : resolves guild Members
func (g *GuildResolver) Members(ctx context.Context) (*[]*MemberResolver, error) {
	fetched, err := (*g.rpc).FetchMembers(ctx, &fetcher.MultiFetchRequest{GuildID: g.guild.Id, IDs: g.guild.Members})
	if err != nil {
		return nil, err
	}
	r := make([]*MemberResolver, len(fetched.Members))
	for i := range fetched.Members {
		r[i] = &MemberResolver{
			rpc:    g.rpc,
			member: fetched.Members[i],
		}
	}
	return &r, nil
}

// Roles : resolves guild Roles
func (g *GuildResolver) Roles(ctx context.Context) (*[]*RoleResolver, error) {
	fetched, err := (*g.rpc).FetchRoles(ctx, &fetcher.MultiFetchRequest{GuildID: g.guild.Id, IDs: g.guild.Roles})
	if err != nil {
		return nil, err
	}
	r := make([]*RoleResolver, len(fetched.Roles))
	for i := range fetched.Roles {
		r[i] = &RoleResolver{
			rpc:  g.rpc,
			role: fetched.Roles[i],
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
