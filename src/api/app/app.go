package app

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/HichuYamichu/fetcher-api/fetcher"
	"github.com/HichuYamichu/fetcher-api/handler"
	"github.com/HichuYamichu/fetcher-api/logger"
	"github.com/HichuYamichu/fetcher-api/resolver"
	"github.com/HichuYamichu/fetcher-api/schema"
	"github.com/go-redis/redis"
	util "github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/graph-gophers/graphql-go"
	grpc_prometheus "github.com/grpc-ecosystem/go-grpc-prometheus"
	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promhttp"
	"google.golang.org/grpc"
)

// App : Application struct
type App struct {
	Router   http.Handler
	Handler  *handler.GraphQL
	Registry *prometheus.Registry
	Logger   *logger.Logger
	Adrr     string
}

// New : Initialize new server instance
func New(host, port, redisURI, gRPCAddr string) *App {
	a := &App{}
	db := redis.NewClient(&redis.Options{
		Addr:     redisURI,
		Password: "",
		DB:       0,
	})

	a.Logger = logger.New(db)
	log.SetOutput(a.Logger)

	reg := prometheus.NewRegistry()
	grpcMetrics := grpc_prometheus.NewClientMetrics()
	reg.MustRegister(grpcMetrics)
	reg.MustRegister(prometheus.NewGoCollector())
	reg.MustRegister(prometheus.NewProcessCollector(prometheus.ProcessCollectorOpts{}))
	a.Registry = reg

	conn, err := grpc.Dial(
		gRPCAddr,
		grpc.WithUnaryInterceptor(grpcMetrics.UnaryClientInterceptor()),
		grpc.WithStreamInterceptor(grpcMetrics.StreamClientInterceptor()),
		grpc.WithInsecure(),
	)
	if err != nil {
		log.Fatal(err)
	}

	rpc := fetcher.NewGuildFetcherClient(conn)

	s, err := schema.Load()
	if err != nil {
		log.Fatal(err)
	}
	res := resolver.New(rpc, db)
	schemaDeff := graphql.MustParseSchema(s, res, graphql.UseStringDescriptions())
	a.Handler = &handler.GraphQL{Schema: schemaDeff}
	a.Router = a.setupRouter()
	a.Adrr = fmt.Sprintf("%s:%s", host, port)
	return a
}

func (a *App) setupRouter() http.Handler {
	r := mux.NewRouter()
	r.Handle("/gql", a.Handler)
	r.Handle("/", &handler.GraphiQL{})
	r.Handle("/metrics", promhttp.HandlerFor(a.Registry, promhttp.HandlerOpts{}))

	allowedHeaders := util.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"})
	allowedOrigins := util.AllowedOrigins([]string{"*"})
	allowedMethods := util.AllowedMethods([]string{"GET", "HEAD", "POST", "PUT", "OPTIONS"})
	h := util.LoggingHandler(os.Stdout, util.CORS(allowedOrigins, allowedHeaders, allowedMethods)(r))
	return h
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
