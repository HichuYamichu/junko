package resolver

import (
	"context"

	"github.com/hichuyamichu/junko-api/fetcher"
)

// CommandResolver : resolves command
type CommandResolver struct {
	rpc     *fetcher.DescriptionFetcherClient
	command string
}

// Name : resolves command name
func (c *CommandResolver) Name(ctx context.Context) *string {
	return &c.command
}

// Description : resolves command cescription
func (c *CommandResolver) Description(ctx context.Context) (*DescriptionResolver, error) {
	fetched, err := (*c.rpc).FetchDescription(ctx, &fetcher.DescriptionRequest{CommandName: c.command})
	if err != nil {
		return nil, err
	}

	res := &DescriptionResolver{
		desc: fetched,
	}

	return res, nil
}
