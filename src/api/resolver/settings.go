package resolver

import (
	"context"

	"github.com/hichuyamichu/junko-api/models"
	"github.com/jinzhu/gorm"
)

// SettingsResolver : resolves role
type SettingsResolver struct {
	db       *gorm.DB
	settings *models.Settings
}

// GuildID : resolves settings GuildID
func (s *SettingsResolver) GuildID(ctx context.Context) *string {
	return &s.settings.GuildID
}

// Prefix : resolves settings Prefix
func (s *SettingsResolver) Prefix(ctx context.Context) *string {
	return &s.settings.Prefix
}

// Preset : resolves settings Preset
func (s *SettingsResolver) Preset(ctx context.Context) *string {
	return &s.settings.Preset
}

// LogChannel : resolves settings LogChannel
func (s *SettingsResolver) LogChannel(ctx context.Context) *string {
	return &s.settings.LogChannel
}

// Blacklist : resolves settings Blacklist
func (s *SettingsResolver) Blacklist(ctx context.Context) *[]string {
	res := make([]string, len(s.settings.Blacklist))
	for i, val := range s.settings.Blacklist {
		res[i] = string(val)
	}
	return &res
}
