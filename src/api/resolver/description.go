package resolver

import (
	"context"

	"github.com/hichuyamichu/junko-api/fetcher"
)

// DescriptionResolver : resolves command
type DescriptionResolver struct {
	desc *fetcher.DescriptionResponce
}

// Content : resolves Description content
func (d *DescriptionResolver) Content(ctx context.Context) *string {
	return &d.desc.Content
}

// Usage : resolves Description usage
func (d *DescriptionResolver) Usage(ctx context.Context) *string {
	return &d.desc.Usage
}

// Examples : resolves Description examples
func (d *DescriptionResolver) Examples(ctx context.Context) *[]string {
	return &d.desc.Examples
}
