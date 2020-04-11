package commands

import (
	"context"

	"github.com/hichuyamichu/junko/errors"
	"github.com/hichuyamichu/junko/junko"
)

type Service struct {
	junkoClient junko.JunkoClient
}

func NewService(junkoClient junko.JunkoClient) *Service {
	return &Service{junkoClient: junkoClient}
}

func (s *Service) Commands(ctx context.Context) ([]*junko.Command, error) {
	const op errors.Op = "commands/service.Commands"

	cmdRes, err := s.junkoClient.GetCommands(ctx, &junko.CommandsRequest{})
	if err != nil {
		return nil, errors.E(err, errors.Internal, op)
	}
	return cmdRes.Commands, nil
}
