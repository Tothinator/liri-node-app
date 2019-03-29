var fs = require("fs");
var axios = require("axios");
var moment = require("moment");
var Spotify = require('node-spotify-api');
var dotenv = require("dotenv").config();
var inquirer = require("inquirer");
var keys = require("./key.js");
var spotify = new Spotify(keys.spotify);

inquirer.prompt([
    {
        type: "list",
        message: "What do you want to do?",
        choices: [ 
            {
                name: "Do something random!",
                value: "do-what-it-says"
            }, 
            {
                name: "Search for a concert!",
                value: "concert-this"
            },
            {
                name: "Search for a song on Spotify!",
                value: "spotify-this-song"
            }, 
            {
                name: "Search for a movie!",
                value: "movie-this"
            }
        ],
        name: "userChoice"
    }
]).then(function(response){
    userSearch(response.userChoice);
});

function userSearch(action) {
    if (action !== "do-what-it-says") {
        switch (action) {
            case "concert-this":
                inquirer.prompt([
                    {
                        type: "input",
                        message: "Who do you want to see?",
                        name: "search"
                    }
                ]).then(function(searchResponse) {
                    handleResponse(action, searchResponse.search);
                });
                break;
    
            case "spotify-this-song":
                inquirer.prompt([
                    {
                        type: "input",
                        message: "What song do you want to search for?\n(You can search by song or song artist)",
                        name: "search"
                    }
                ]).then(function(searchResponse) {
                    handleResponse(action, searchResponse.search);
                });
                break;
    
            case "movie-this":
                inquirer.prompt([
                    {
                        type: "input",
                        message: "What movie do you want to search for?",
                        name: "search"
                    }
                ]).then(function(searchResponse) {
                    handleResponse(action, searchResponse.search);
                });
                break;
    
            default:
                console.log("How did you get here?!?!")
                break;
        }
    } else if (action === "do-what-it-says") {
        randomSearch();
    } else {
        console.log("How did you end up here?!");
    }
}

function handleResponse(action, item) {
    // console.log(action);
    switch (action) {
        case "concert-this":
            concertSearch(item);
            break;

        case "spotify-this-song":
            spotifySearch(item);
            break;

        case "movie-this":
            movieSearch(item);
            break;

        default:
            console.log("How did you get here?!?!")
            break;
            
    }
}

function randomSearch() {
    // console.log("Random Search");
    fs.readFile("./random.txt", "utf8", function(err, data){

        if (err){
            console.log(err);
        }

        var lines = data.split(/\r?\n/);
        // console.log(lines);

        var randomItem = lines[Math.floor(Math.random() * lines.length)].split(",");
        // console.log(randomItem);

        handleResponse(randomItem[0], randomItem[1].replace(/\"/g, ""))

    });
}

function concertSearch(band) {
    // console.log("Concert Search");
    // console.log(band);

    var queryURL = "https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp";

    if (band === "") {
        console.log("You didn't put anything in!");
        searchAgain("concert-this");
    } else {
        axios.get(queryURL).then(function(response) {
            
            var events = response.data;
            // console.log(events);

            separator();

            if (events.length !== 0) {
                console.log("List of events for " + band + "!\n")

                for (var i = 0; i < events.length; i++) {

                    var venueDate = moment(events[i].datetime).format("MM/DD/YYYY");

                    console.log("Venue: " + events[i].venue.name);
                    console.log("City: " + events[i].venue.city);
                    console.log("State/Region: " + events[i].venue.region);
                    console.log("Date: " + venueDate);
                    
                    separator();
                }
            } else {
                console.log("Sorry no events found!");
                searchAgain("concert-this");
            }
        });
    }
}

function spotifySearch(song) {
    // console.log("Spotify Search");
    // console.log(song);

    if (song === ""){
        song = 'The Sign ace of base';
    }

    spotify.search({ type: 'track', limit: 1, query: song }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }

        var tracks = data.tracks.items;

        if (tracks.length === 0){
            console.log("Sorry we couldn't find that song.");
            searchAgain("spotify-this-song");
        } else {
            console.log("Artist: " + tracks[0].artists[0].name);
            console.log("Song name: " + tracks[0].name);
            console.log("Album: " + tracks[0].album.name);
            console.log("Preview: " + tracks[0].preview_url);
        }
       
    });
}

function movieSearch(movie) {
    // console.log("Movie Search");
    // console.log(movie);

    if (movie === ""){
        movie = "Mr. Nobody";
    }

    movie = movie.replace(/\s/, "+");
    // console.log(movie);

    var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

    axios.get(queryURL).then(function(response) {

        var movieInfo = response.data;
        // console.log(movieInfo);
        
        separator();

        if (movieInfo.Error !== "Movie not found!") {
        
            console.log("Title: " + movieInfo.Title);
            console.log("Year of release: " + movieInfo.Year);
            console.log("IMDB rating: " + movieInfo.imdbRating);
            console.log("Rotten Tomatoes: " + movieInfo.Ratings[1].Value);
            console.log("Country: " + movieInfo.Country);
            console.log("Language: " + movieInfo.Language);
            console.log("Actors: " + movieInfo.Actors);
            console.log("Plot: " + movieInfo.Plot);
        } else {
            console.log("Sorry movie not found!");
            searchAgain("movie-this");
        }

    });
}

function searchAgain(action) {
    inquirer.prompt([
        {
            type: "confirm",
            message: "Do you want to try another search?",
            name: "doSearch",
            default: false
        }
    ]).then(function(response){
        if (response.doSearch){
            userSearch(action);
        } else {
            console.log("Okay bye!");
        }
    })
}

function separator() {
    console.log();
    console.log("#########################################");
    console.log(); 
}
