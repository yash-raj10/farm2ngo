package controllers

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/gorilla/mux"
	"github.com/yash-raj10/farm2ngo-Backend/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const Link = "mongodb+srv://yashrajse:kQZFWGFkOHlnIopp@cluster1.jxx6eoc.mongodb.net/test"

var collection *mongo.Collection

//mongoDB initialization
func init(){
	clientOption := options.Client().ApplyURI(Link)
	
	client, err := mongo.Connect(context.TODO(), clientOption)
	if err != nil{
		log.Fatal(err)
	}

	fmt.Print("Connection Success\n")

	collection = client.Database("farm2ngo").Collection("profiles")
	fmt.Print("Instance is Ready\n")
}

// mongo helper
func addOneProfile(profile models.Profile){
	added, err := collection.InsertOne(context.Background(), profile)
	if err!= nil{
		log.Fatal(err)
	}

	fmt.Println("Added profile with id:", added.InsertedID)
}

func getAllProfile() []bson.M {
	cursor, err := collection.Find(context.Background(), bson.M{})
	if err != nil{
		log.Fatal(err)
	}

	var profiles []bson.M

	for cursor.Next(context.Background()){
		var profile bson.M
		err:= cursor.Decode(&profile)
		if err != nil{
			log.Fatal(err)
		}
		profiles = append(profiles,profile)
	}

	defer cursor.Close(context.Background())
	return profiles

}

func getOneProfile( userEmail string) (bson.M, error) {
	
	
	var profile bson.M
	err := collection.FindOne(context.Background(), bson.M{"mail": userEmail}).Decode(&profile)
    if err != nil {
		return nil, err
    }
	
	return profile, err

}


//Real Once
func GetOneProfile(w http.ResponseWriter, r *http.Request){
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)
	email := strings.ToLower(params["userEmail"])

	singleProfile, err := getOneProfile(email)
	if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

	if singleProfile == nil {
        http.Error(w, "Profile not found", http.StatusNotFound)
        return
    }

	json.NewEncoder(w).Encode(singleProfile)
}

func GetAllProfiles(w http.ResponseWriter, r *http.Request){
	w.Header().Set("Content-Type", "application/json")
	allProfiles := getAllProfile()
	json.NewEncoder(w).Encode(allProfiles)
}



func AddProfile(w http.ResponseWriter, r *http.Request){
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Allow-Control-Allow-Methods", "POST")
	

	var profile models.Profile
	fmt.Println("Request Body:", r.Body)
	err := json.NewDecoder(r.Body).Decode(&profile)
	
	if err != nil{
		http.Error(w, err.Error(), http.StatusBadRequest)
        return
	}
	
	addOneProfile(profile)
	json.NewEncoder(w).Encode(profile)
}