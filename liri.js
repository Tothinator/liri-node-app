var fs = require("fs");
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var dotenv = require("dotenv").config();
var inquirer = require("inquirer");
var keys = require("./key.js");
// var spotify = Spotify(keys.spotify);

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
                name: "Spotify a song!",
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

    if (response.userChoice !== "do-what-it-says") {
        inquirer.prompt([
            {
                type: "input",
                message: "What do you want to search for?",
                name: "search"
            }
        ]).then(function(searchResponse) {
            handleResponse(response.userChoice, searchResponse.search);
        });
    } else if (response.userChoice === "do-what-it-says") {
        randomSearch();
    } else {
        console.log("How did you end up here?!");
    }
});

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

        var lines = data.split('\n');

        var randomItem = lines[Math.floor(Math.random() * lines.length)];
        console.log(lines);

    });
}

function concertSearch(band) {
    // console.log("Concert Search");
}

function spotifySearch(song) {
    // console.log("Spotify Search");
}

function movieSearch(movie) {
    // console.log("Movie Search");
}
