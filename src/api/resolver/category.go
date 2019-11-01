package resolver

import (
	"context"

	"github.com/hichuyamichu/junko-api/fetcher"
)

// CategoryResolver : resolves category
type CategoryResolver struct {
	rpc      *fetcher.DescriptionFetcherClient
	category string
}

// Name : resolves category name
func (c *CategoryResolver) Name(ctx context.Context) *string {
	return &c.category
}

// Commands : resolves category commands
func (c *CategoryResolver) Commands(ctx context.Context) (*[]*CommandResolver, error) {
	fetched, err := (*c.rpc).FetchCommands(ctx, &fetcher.CommandsRequest{CategoryName: c.category})
	if err != nil {
		return nil, err
	}

	res := make([]*CommandResolver, len(fetched.CommandNames))
	for i := range fetched.CommandNames {
		res[i] = &CommandResolver{
			rpc:     c.rpc,
			command: fetched.CommandNames[i],
		}
	}

	return &res, nil
}
