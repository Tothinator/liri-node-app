# liri-node-app

## Functionality 
The purpose of this bot is to inquire the user of whether they want to search for, a concert, a song, a movie, or for the bot to choose to search for something without the user's input.  This was done with inquirer to reduce user input error and to make it easier to handle user error (misspelling, ect.).  There are default values to the spotify and movie searches if the user inputs nothings, as well as error handling if the user doesn't get any results back from their search.  On the latter, the bot will ask if they would like to try another search of the same type.  Finally, the [random.txt](./random.txt) file holds 3 lines for a search of each of the different searches.  This can be expanded using the format search-type,"search term".  The bot will read the file, choose a line at random, then pase and call the methods for that particular search.

## Improvements
Currently the code is a little sloppy as I use mainly recursion to loop through the program again if there are errors. A huge improvement would be to use a validate function within inquirer, however at the time of writing this code, I did not know that was an option.  This itself would cut out at least 50 lines of code for me (I think), as well as make the program much more readable.  Other improvemtents would be to split the different searches into modules and import them into a main file for readability as well as organization.  Lastly, adding more options for the user through prompts (e.g. asking if they want to exit or do another search after completing a search vs. immediatly exiting the program).

## Gif Demos of the application

User wants [random choice](https://gfycat.com/FilthyTatteredHoneycreeper)

User wants to search for a [concert](https://gfycat.com/InfantileAbandonedDwarfrabbit).

User wants to search for a [song](https://gfycat.com/ImpassionedFlickeringClownanemonefish).

User wants to search for a [movie](https://gfycat.com/CavernousThornyCanary).

[Error Handling](https://gfycat.com/PointlessPitifulConch)