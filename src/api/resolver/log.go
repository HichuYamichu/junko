package resolver

import (
	"context"

	"github.com/go-redis/redis"
)

// LogResolver : rosolves logs
type LogResolver struct {
	logs *redis.StringSliceCmd
}

// Content : rosolves log Content
func (l *LogResolver) Content(ctx context.Context) *[]*string {
	values := l.logs.Val()
	var res []*string

	for i := range values {
		res = append(res, &values[i])
	}
	return &res
}
