package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/yash-raj10/farm2ngo-Backend/controllers"
)

func main(){

	r := mux.NewRouter()

	r.HandleFunc("/api/profiles", controllers.GetAllProfiles).Methods("GET")
	r.HandleFunc("/api/profile/{userEmail}", controllers.GetOneProfile).Methods("GET")
	r.HandleFunc("/api/addProfile", controllers.AddProfile).Methods("POST")

	cors := handlers.CORS(
		handlers.AllowedHeaders([]string{"Content-Type"}),
		handlers.AllowedOrigins([]string{"*"}),
		handlers.AllowCredentials(),
	)

	http.Handle("/", cors(r))

	fmt.Println("Listening at port 4000")
	log.Fatal(http.ListenAndServe(":4000", nil))

}