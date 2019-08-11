package handlers

import (
	"context"
	"encoding/json"
	"io/ioutil"
	"net/http"

	appCtx "github.com/HichuYamichu/fetcher-api/app/context"

	"github.com/HichuYamichu/fetcher-api/fetcher"
	"github.com/gorilla/mux"
)

// FetchGuilds : Fetches ids and names of all available guilds
func FetchGuilds(ctx *appCtx.Context, w http.ResponseWriter, r *http.Request) *AppError {
	r.Header.Set("content-type", "application/json")

	guilds, err := ctx.RPC.FetchGuilds(context.Background(), &fetcher.Void{})
	if err != nil {
		return &AppError{
			Err:  err,
			Msg:  http.StatusText(http.StatusInternalServerError),
			Code: http.StatusInternalServerError}
	}

	guildsJSON, err := json.Marshal(guilds)
	if err != nil {
		return &AppError{
			Err:  err,
			Msg:  http.StatusText(http.StatusInternalServerError),
			Code: http.StatusInternalServerError}
	}

	w.Write(guildsJSON)
	return nil
}

// FetchGuild : Fetches all available information about guild
func FetchGuild(ctx *appCtx.Context, w http.ResponseWriter, r *http.Request) *AppError {
	r.Header.Set("content-type", "application/json")
	params := mux.Vars(r)
	id := params["id"]

	guild, err := ctx.RPC.FetchGuild(context.Background(), &fetcher.ID{Id: id})
	if err != nil {
		return &AppError{
			Err:  err,
			Msg:  http.StatusText(http.StatusInternalServerError),
			Code: http.StatusInternalServerError}
	}

	guildJSON, err := json.Marshal(guild)
	if err != nil {
		return &AppError{
			Err:  err,
			Msg:  http.StatusText(http.StatusInternalServerError),
			Code: http.StatusInternalServerError}
	}

	w.Write(guildJSON)
	return nil
}

// Say : Sends a message to specific channel
func Say(ctx *appCtx.Context, w http.ResponseWriter, r *http.Request) *AppError {
	r.Header.Set("content-type", "application/json")

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		return &AppError{
			Err:  err,
			Msg:  http.StatusText(http.StatusInternalServerError),
			Code: http.StatusInternalServerError}
	}

	var msg fetcher.Msg
	err = json.Unmarshal(body, &msg)
	if err != nil {
		return &AppError{
			Err:  err,
			Msg:  http.StatusText(http.StatusInternalServerError),
			Code: http.StatusInternalServerError}
	}

	_, err = ctx.RPC.Say(context.Background(), &msg)
	if err != nil {
		return &AppError{
			Err:  err,
			Msg:  http.StatusText(http.StatusInternalServerError),
			Code: http.StatusInternalServerError}
	}

	return nil
}
