package logger

import (
	"os"

	"github.com/go-redis/redis"
)

// Logger : logger deffiniton
type Logger struct {
	DB *redis.Client
}

// New : constructor function for Logger
func New(db *redis.Client) *Logger {
	l := &Logger{
		DB: db,
	}
	return l
}

func (l *Logger) Write(data []byte) (n int, err error) {
	l.DB.RPush("api-logs", data)
	n, err = os.Stdout.Write(data)
	if err != nil {
		return n, err
	}
	return n, nil
}
