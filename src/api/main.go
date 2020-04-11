package main

import (
	"context"
	"log"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/hichuyamichu/junko/server"
	"github.com/spf13/viper"
	"google.golang.org/grpc"
)

func init() {
	viper.SetConfigName("config")
	viper.SetConfigType("yaml")
	viper.AddConfigPath(".")
	viper.AddConfigPath("/etc/junko")
	err := viper.ReadInConfig()
	if err != nil {
		log.Fatalf("fatal error config file: %s", err)
	}
}

func main() {
	junkoRPCADDR := viper.GetString("grpc_addr")
	conn, err := grpc.Dial(junkoRPCADDR, grpc.WithInsecure())
	if err != nil {
		panic(err)
	}

	srv := server.New(conn)

	go func() {
		done := make(chan os.Signal, 1)
		signal.Notify(done, os.Interrupt, syscall.SIGINT, syscall.SIGTERM)
		<-done
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		srv.Shutdown(ctx)
	}()

	port := viper.GetString("port")
	host := viper.GetString("host")

	log.Fatal(srv.Start(host, port))
}
