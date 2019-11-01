package resolver

import (
	"context"

	"github.com/hichuyamichu/junko-api/fetcher"
)

// Resolver : root resolver
type Resolver struct {
	RPC *fetcher.DescriptionFetcherClient
}

// Categories : resolves Categories query
func (r *Resolver) Categories(ctx context.Context) (*[]*CategoryResolver, error) {
	fetched, err := (*r.RPC).FetchCategories(ctx, &fetcher.CategoriesRequest{})
	if err != nil {
		return nil, err
	}

	res := make([]*CategoryResolver, len(fetched.CategoryNames))
	for i := range fetched.CategoryNames {
		res[i] = &CategoryResolver{
			rpc:      r.RPC,
			category: fetched.CategoryNames[i],
		}
	}

	return &res, nil
}

// Category : resolves Category query
func (r *Resolver) Category(ctx context.Context, args struct{ Name string }) (*CategoryResolver, error) {
	res := &CategoryResolver{
		rpc:      r.RPC,
		category: args.Name,
	}

	return res, nil
}
