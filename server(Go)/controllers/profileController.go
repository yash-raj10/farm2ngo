package controllers

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/yash-raj10/farm2ngo-Backend/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
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

func getOneProfile( profileID string) bson.M {
	id, _ := primitive.ObjectIDFromHex(profileID)
	
	var profile bson.M
	err := collection.FindOne(context.Background(), bson.M{"_id": id}).Decode(&profile)
    if err != nil {
        log.Fatal(err)
    }
	
	return profile

}


//Real Once
func GetAllProfiles(w http.ResponseWriter, r *http.Request){
	w.Header().Set("Content-Type", "application/json")
	allProfiles := getAllProfile()
	json.NewEncoder(w).Encode(allProfiles)
}

func GetOneProfile(w http.ResponseWriter, r *http.Request){
	w.Header().Set("Content-Type", "application/json")


	params := mux.Vars(r)
	singleProfile := getOneProfile(params["id"])
	json.NewEncoder(w).Encode(singleProfile)

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