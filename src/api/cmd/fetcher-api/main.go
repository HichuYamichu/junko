package main

import (
	"flag"

	"github.com/HichuYamichu/fetcher-api/app"
)

var port = flag.String("port", "3000", "http service port")
var host = flag.String("host", "127.0.0.1", "http service host")
var redisURI = flag.String("redisURI", "172.19.168.235:6379", "Redis instance URI")
var gRPCAddr = flag.String("gRPCAddr", "127.0.0.1:50051", "gRPC server URI")

func main() {
	flag.Parse()
	srv := app.New(*host, *port, *redisURI, *gRPCAddr)
	srv.Run()
}
