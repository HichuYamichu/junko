package commands

import (
	"context"
	"time"

	"github.com/hichuyamichu/junko/errors"
	"github.com/labstack/echo/v4"
)

type Handler struct {
	cmdServ *Service
}

func NewHandler(cmdServ *Service) *Handler {
	return &Handler{cmdServ: cmdServ}
}

func (h *Handler) Commands(c echo.Context) error {
	const op errors.Op = "commands/handler.Commands"

	ctx, cancel := context.WithTimeout(context.Background(), time.Second*10)
	defer cancel()

	res, err := h.cmdServ.Commands(ctx)
	if err != nil {
		return errors.E(err, op)
	}
	return c.JSON(200, res)
}
