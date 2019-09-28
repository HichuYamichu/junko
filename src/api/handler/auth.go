package handler

import (
	"encoding/json"
	"net/http"
	"os"
	"time"

	"github.com/dgrijalva/jwt-go"
)

// Authorization : handler for /auth route
type Authorization struct{}

// Credentials : login payload struct
type Credentials struct {
	Password string `json:"password"`
	Login    string `json:"login"`
}

var jwtKey = os.Getenv("SECRET")
var login = os.Getenv("ADMIN_LOGIN")
var password = os.Getenv("ADMIN_PASSWORD")

func (Authorization) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	var creds Credentials
	err := json.NewDecoder(r.Body).Decode(&creds)
	if err != nil {
		http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
		return
	}

	if creds.Login != login || creds.Password != password {
		http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
		return
	}

	expirationTime := time.Now().Add(5 * time.Minute)
	token := jwt.New(jwt.SigningMethodHS256)
	tokenString, err := token.SignedString([]byte(jwtKey))
	if err != nil {
		http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:    "token",
		Value:   tokenString,
		Expires: expirationTime,
	})
}
