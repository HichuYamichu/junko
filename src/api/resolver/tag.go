package resolver

import (
	"context"

	"github.com/hichuyamichu/fetcher-api/models"
	"github.com/jinzhu/gorm"
)

// TagResolver : resolves tag
type TagResolver struct {
	db  *gorm.DB
	tag *models.Tag
}

// TagID : resolves tag TagID
func (t *TagResolver) TagID(ctx context.Context) *string {
	return &t.tag.TagID
}

// GuildID : resolves tag GuildID
func (t *TagResolver) GuildID(ctx context.Context) *string {
	return &t.tag.GuildID
}

// Author : resolves tag Author
func (t *TagResolver) Author(ctx context.Context) *string {
	return &t.tag.Author
}

// Name : resolves tag Name
func (t *TagResolver) Name(ctx context.Context) *string {
	return &t.tag.Name
}

// Content : resolves tag Content
func (t *TagResolver) Content(ctx context.Context) *string {
	return &t.tag.Content
}
