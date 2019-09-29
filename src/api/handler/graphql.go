package handler

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/dgrijalva/jwt-go"
	"github.com/graph-gophers/graphql-go"
)

// GraphQL : GraphQL instance
type GraphQL struct {
	Schema *graphql.Schema
}

func (h *GraphQL) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	var params struct {
		Query         string                 `json:"query"`
		OperationName string                 `json:"operationName"`
		Variables     map[string]interface{} `json:"variables"`
	}
	if err := json.NewDecoder(r.Body).Decode(&params); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	c, err := r.Cookie("token")
	if err != nil {
		fmt.Println(err)

		http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
		return
	}

	tknStr := c.Value
	tkn, err := jwt.Parse(tknStr, func(token *jwt.Token) (interface{}, error) {
		return []byte(jwtKey), nil
	})
	if err != nil {

		http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
		return
	}

	if !tkn.Valid {

		http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
		return
	}

	ctx := r.Context()

	response := h.Schema.Exec(ctx, params.Query, params.OperationName, params.Variables)
	responseJSON, err := json.Marshal(response)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(responseJSON)
}
