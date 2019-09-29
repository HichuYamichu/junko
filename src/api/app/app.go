package app

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/cors"
	"github.com/gobuffalo/packr"
	"github.com/graph-gophers/graphql-go"
	grpc_prometheus "github.com/grpc-ecosystem/go-grpc-prometheus"
	"github.com/hichuyamichu/junko-api/fetcher"
	"github.com/hichuyamichu/junko-api/handler"
	"github.com/hichuyamichu/junko-api/resolver"
	"github.com/jinzhu/gorm"
	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promhttp"
	"google.golang.org/grpc"
)

// App : Application struct
type App struct {
	srv *http.Server
	rpc *fetcher.GuildFetcherClient
	reg *prometheus.Registry
	db  *gorm.DB
}

// New : Initialize new server instance
func New(host, port string) *App {
	a := &App{}
	a.db = a.connectDB()
	a.reg = prometheus.NewRegistry()
	a.rpc = a.setupRPC()
	a.srv = &http.Server{}
	a.srv.Addr = fmt.Sprintf("%s:%s", host, port)
	a.srv.Handler = a.setupHandler()
	a.srv.WriteTimeout = 15 * time.Second
	a.srv.ReadTimeout = 15 * time.Second
	return a
}

func (a *App) setupHandler() http.Handler {
	r := chi.NewRouter()
	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(middleware.Timeout(60 * time.Second))

	cors := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:8080", "http://localhost"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token", "Set-Cookie", "*"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300,
	})
	r.Use(cors.Handler)

	schema := a.setupSchema()
	r.Method("GET", "/", &handler.GraphiQL{})
	r.Method("POST", "/auth", &handler.Authorization{})
	r.Method("POST", "/query", &handler.GraphQL{Schema: schema})
	r.Method("GET", "/metrics", promhttp.HandlerFor(a.reg, promhttp.HandlerOpts{}))

	return r
}

func (a *App) setupSchema() *graphql.Schema {
	box := packr.NewBox("../schema")
	schema, err := box.FindString("schema.graphql")
	if err != nil {
		panic(err)
	}
	res := &resolver.Resolver{RPC: a.rpc, DB: a.db}
	schemaDeff := graphql.MustParseSchema(schema, res, graphql.UseStringDescriptions())
	return schemaDeff
}

func (a *App) setupRPC() *fetcher.GuildFetcherClient {
	grpcMetrics := grpc_prometheus.NewClientMetrics()
	a.reg.MustRegister(grpcMetrics)
	a.reg.MustRegister(prometheus.NewGoCollector())
	a.reg.MustRegister(prometheus.NewProcessCollector(prometheus.ProcessCollectorOpts{}))

	grpcAddr := os.Getenv("RPC_URI")
	if grpcAddr == "" {
		grpcAddr = "127.0.0.1:50051"
	}

	conn, err := grpc.Dial(
		grpcAddr,
		grpc.WithUnaryInterceptor(grpcMetrics.UnaryClientInterceptor()),
		grpc.WithStreamInterceptor(grpcMetrics.StreamClientInterceptor()),
		grpc.WithInsecure(),
	)
	if err != nil {
		panic(err)
	}

	rpc := fetcher.NewGuildFetcherClient(conn)
	return &rpc
}

func (a *App) connectDB() *gorm.DB {
	host := os.Getenv("POSTGRES_HOST")
	user := os.Getenv("POSTGRES_USER")
	dbname := os.Getenv("POSTGRES_DB")
	password := os.Getenv("POSTGRES_PASSWORD")

	uri := fmt.Sprintf("host=%s port=5432 user=%s dbname=%s password=%s sslmode=disable", host, user, dbname, password)
	db, err := gorm.Open("postgres", uri)
	if err != nil {
		log.Println(err)
		time.Sleep(5 * time.Second)
		a.connectDB()
	}
	log.Println("Connected to db")
	return db
}

// Run : Starts the app
func (a *App) Run() {
	log.Printf("Listening on: http://%s\n", a.srv.Addr)
	log.Fatal(a.srv.ListenAndServe())
}

// Shutdown : Stops the app
func (a *App) Shutdown() {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := a.srv.Shutdown(ctx); err != nil {
		log.Fatalf("Server Shutdown Failed:%+v", err)
	}
}
