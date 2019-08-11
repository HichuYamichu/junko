package app

import (
	"fmt"
	"log"
	"net/http"
	"time"

	appCtx "github.com/HichuYamichu/fetcher-api/app/context"
	"github.com/HichuYamichu/fetcher-api/app/handlers"
	"github.com/HichuYamichu/fetcher-api/fetcher"
	"github.com/go-redis/redis"
	"github.com/gorilla/mux"
	"google.golang.org/grpc"
)

// App : Application struct
type App struct {
	Router *mux.Router
	Ctx    *appCtx.Context
	Adrr   string
}

// NewServer : Initialize new server instance
func NewServer(host, port, redisURI, gRPCAddr string) *App {
	a := &App{}
	db := redis.NewClient(&redis.Options{
		Addr:     redisURI,
		Password: "",
		DB:       0,
	})

	conn, err := grpc.Dial(gRPCAddr, grpc.WithInsecure())
	if err != nil {
		log.Fatal(err)
	}
	rpc := fetcher.NewGuildFetcherClient(conn)

	ctx := appCtx.NewContext(db, rpc)

	a.Ctx = ctx
	a.Router = mux.NewRouter()
	a.setRouters()
	a.Adrr = fmt.Sprintf("%s:%s", host, port)
	return a
}

func (a *App) setRouters() {
	a.Router.HandleFunc("/api/guilds", a.handle(handlers.FetchGuilds)).Methods("GET")
	a.Router.HandleFunc("/api/guild/{id}", a.handle(handlers.FetchGuild)).Methods("GET")
	a.Router.HandleFunc("/api/say", a.handle(handlers.Say)).Methods("POST")
}

type handler func(ctx *appCtx.Context, w http.ResponseWriter, r *http.Request) *handlers.AppError

func (a *App) handle(h handler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if err := h(a.Ctx, w, r); err != nil {
			fmt.Println(err)
			http.Error(w, err.Msg, err.Code)
		}
	}
}

// Run : Starts the http server
func (a *App) Run() {
	srv := &http.Server{
		Handler:      a.Router,
		Addr:         a.Adrr,
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}
	fmt.Printf("Listening on: %s\n", a.Adrr)
	log.Fatal(srv.ListenAndServe())
}
