//Declare variables for the playlist songs, play button and pause button.
const playlistSongs = document.getElementById("playlist-songs");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
//Access the #next, #previous and #shuffle elements from the HTML file.
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");
const shuffleButton = document.getElementById("shuffle");
//Next, create an array to store all the songs.
const allSongs = [
    {
        id: 0,
        title: "Scratching The Surface",
        artist: "Quincy Larson",
        duration: "4:25",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/scratching-the-surface.mp3",
    },
    {
        id: 1,
        title: "Can't Stay Down",
        artist: "Quincy Larson",
        duration: "4:15",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/cant-stay-down.mp3",
    },
    {
        id: 2,
        title: "Still Learning",
        artist: "Quincy Larson",
        duration: "3:51",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/still-learning.mp3",
    },
    {
        id: 3,
        title: "Cruising for a Musing",
        artist: "Quincy Larson",
        duration: "3:34",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/cruising-for-a-musing.mp3",
    },
    {
        id: 4,
        title: "Never Not Favored",
        artist: "Quincy Larson",
        duration: "3:35",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/never-not-favored.mp3",
    },
    {
        id: 5,
        title: "From the Ground Up",
        artist: "Quincy Larson",
        duration: "3:12",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/from-the-ground-up.mp3",
    },
    {
        id: 6,
        title: "Walking on Air",
        artist: "Quincy Larson",
        duration: "3:25",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/walking-on-air.mp3",
    },
    {
        id: 7,
        title: "Can't Stop Me. Can't Even Slow Me Down.",
        artist: "Quincy Larson",
        duration: "3:52",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/cant-stop-me-cant-even-slow-me-down.mp3",
    },
    {
        id: 8,
        title: "The Surest Way Out is Through",
        artist: "Quincy Larson",
        duration: "3:10",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/the-surest-way-out-is-through.mp3",
    },
    {
        id: 9,
        title: "Chasing That Feeling",
        artist: "Quincy Larson",
        duration: "2:43",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/chasing-that-feeling.mp3",
    },
];
//All modern browsers support the Web Audio API, which lets you generate and process audio in web applications.Use const to create a variable named audio and set it equal to new Audio(). This will create a new HTML5 audio element.
const audio = new Audio();
//Your music player should keep track of the songs, the current song playing, and the time of the current song. To do this, you will need to create an object to store this information.
let userData = {
    //Since users will be able to shuffle and delete songs from the playlist, you will need to create a copy of the allSongs array without mutating the original. This is where the spread operator comes in handy.The spread operator (...) allows you to copy all elements from one array into another. It can also be used to concatenate multiple arrays into one.
    songs: [...allSongs],
    //To handle the current song's information and track its playback time, create a currentSong and songCurrentTime properties. Set the values to null and 0 respectively.
    currentSong: null,
    songCurrentTime: 0
};
//Define a playSong function using const. The function should take an id parameter which will represent the unique identifier of the song you want to play.
const playSong = (id) => {
    //The find() method retrieves the first element within an array that fulfills the conditions specified in the provided callback function. If no element satisfies the condition, the method returns undefined.Use const to create a variable named song and assign it result of the find() method call on the userData?.songs array. Use song as the parameter of the find() callback and check if song.id is strictly equal to id.
    const song = userData?.songs.find((song) => song.id === id);
    //set the audio.src property equal to song.src. This tells the audio element where to find the audio data for the selected song.Also, set the audio.title property equal to song.title. This tells the audio element what to display as the title of the song.
    audio.src = song.src;
    audio.title = song.title;
    //efore playing the song, you need to make sure it starts from the beginning. This can be achieved by the use of the currentTime property of the audio object.Add an if statement to check whether the userData?.currentSong is null or if userData?.currentSong.id is strictly not equal song.id. Inside if block, set the currentTime property of the audio object to 0.
    if (userData?.currentSong === null || userData?.currentSong.id !== song.id) {
        audio.currentTime = 0;
    }//Add an else block to handle the current song's position in the playlist.Within the else block, set the currentTime property of the audio object to the value stored in userData?.songCurrentTime.
    else {
        audio.currentTime = userData?.songCurrentTime;
    }
    //You need to update the current song being played as well as the appearance of the playButton element.Start by accessing the userData object and its currentSong property. Set its value equal to the song variable.
    userData.currentSong = song;
    //Next, use the classList property and the add() method to add the playing class to the playButton element. This will look for the class playing in the CSS file and add it to the playButton element.
    playButton.classList.add("playing");
    //Inside the playSong function, call the highlightCurrentSong function.
    highlightCurrentSong();
    //To ensure the player's display updates whenever a new song begins playing, call the setPlayerDisplay() function within the playSong() function.
    setPlayerDisplay();
    //Call the setPlayButtonAccessibleText function inside the playSong function.
    setPlayButtonAccessibleText();
    //finally play the song, use the play() method on the audio variable. play() is a method from the web audio API for playing an mp3 file.
    audio.play();
};

const pauseSong = () => {
    //To store the current time of the song when it is paused, set the songCurrentTime of the userData object to the currentTime of the audio variable.ou should not use optional chaining for this step because userData.songCurrentTime will not be null or undefined at this point.
    userData.songCurrentTime = audio.currentTime;
    //Use classList and remove() method to remove the .playing class from the playButton, since the song will be paused at this point.
    playButton.classList.remove("playing");
    //To finally pause the song, use the pause() method on the audio variable. pause() is a method of the Web Audio API for pausing music files.
    audio.pause();
}

const playNextSong = () => {
    //Create an if statement to check if the currentSong of userData is strictly equal to null. This will check if there's no current song playing in the userData object.
    if (userData?.currentSong === null) {
        //If the condition is true, call the playSong function with the id of the first song in the userData?.songs array as an argument.
        playSong(userData?.songs[0].id);
    }//Add an else block to the if statement. Inside the else block, call the getCurrentSongIndex() function and assign it to a constant named currentSongIndex.
    else {
        const currentSongIndex = getCurrentSongIndex();
        //Create a constant called nextSong and assign userData?.songs[currentSongIndex + 1] to it.
        const nextSong = userData?.songs[currentSongIndex + 1];
        //Lastly, call the playSong function and pass in nextSong.id as the argument.
        playSong(nextSong.id);
    }
}

const playPreviousSong = () => {
    //Add an if statement with a condition of userData?.currentSong === null. This will check if there is currently no song playing.
    if (userData?.currentSong === null) {
        // If there isn't any, exit the function using a return.
        return;
    }//Inside the else block, create a constant named currentSongIndex and assign it getCurrentSongIndex().
    else {
        const currentSongIndex = getCurrentSongIndex();
        //To get the previous song, subtract 1 from the currentSongIndex of userData?.songs and assign it to the constant previousSong.
        const previousSong = userData?.songs[currentSongIndex - 1];
        //After that, call the playSong function and pass previousSong.id as an argument.
        playSong(previousSong.id);
    }
}
//This function is responsible for shuffling the songs in the playlist and performing necessary state management updates after the shuffling.
const shuffle = () => {
    //One way to randomize an array of items would be to subtract 0.5 from Math.random() which produces random values that are either positive or negative. This makes the comparison result a mix of positive and negative values, leading to a random ordering of elements.Use the sort() method on the userData?.songs array. Pass a callback to the method, and return the result of Math.random() - 0.5.
    userData?.songs.sort(() => Math.random() - 0.5);
    //When the shuffle button is pressed, you want to set the currentSong to nothing and the songCurrentTime to 0.
    userData.currentSong = null;
    userData.songCurrentTime = 0;
    //Call the renderSongs function and pass in userData?.songs as an argument. Also, call the pauseSong, setPlayerDisplay, and setPlayButtonAccessibleText functions.
    renderSongs(userData?.songs);
    pauseSong();
    setPlayerDisplay();
    setPlayButtonAccessibleText();
}

const deleteSong = (id) => {
    //Before deleting a song, you need to check if the song is currently playing. If it is, you need to pause the song and play the next song in the playlist.
    if (userData?.currentSong?.id === id) {
        //If there is a match then set userData.currentSong to null and userData.songCurrentTime to 0.
        userData.currentSong = null;
        userData.songCurrentTime = 0;
        //Call the pauseSong() function to stop the playback and the setPlayerDisplay() function to update the player display.
        pauseSong();
        setPlayerDisplay();
    }
    //The filter method keeps only the elements of an array that satisfy the callback function passed to it.Use the filter() method on userData?.songs. Pass in song as the parameter of the arrow function callback and use implicit return to check if song.id is strictly not equal to id. Assign all of that to the userData.songs.
    userData.songs = userData?.songs.filter((song) => song.id !== id);
    //Call the renderSongs function and pass in the userData?.songs array as an argument, this displays the modified playlist.
    renderSongs(userData?.songs);
    //After that, call the highlightCurrentSong function to highlight the current song if there is any also and the setPlayButtonAccessibleText function to update the play button's accessible text.
    highlightCurrentSong();
    setPlayButtonAccessibleText();
    //Next, you need to check if the playlist is empty. If it is, you should reset the userData object to its original state.
    if(userData?.songs.length===0){
        const resetButton = document.createElement("button");
        //Use the createTextNode() method to create a Reset Playlist text, then assign it to a resetText constant.
        const resetText = document.createTextNode("Reset Playlist");
        //Set the id attribute of resetButton to reset and its aria-label attribute to Reset playlist.
        resetButton.id = "reset";  
        resetButton.ariaLabel = "Reset playlist";
        //Use appendChild() to attach resetText to resetButton element, and resetButton to the playlistSongs element.
        resetButton.appendChild(resetText);
        playlistSongs.appendChild(resetButton);
        //Now, it's time to add the reset functionality to the resetButton. This will bring back the songs in the playlist when clicked.
        resetButton.addEventListener("click",()=>{
            //To reset the playlist to its original state, spread allSongs into an array and assign it to userData.songs.
            userData.songs = [...allSongs];
            //Finally, you should render the songs again, update the play button's accessible text, and remove the reset button from the playlist. You also need to remove the resetButton from the DOM.
            renderSongs(sortSongs());
            setPlayButtonAccessibleText();
            resetButton.remove();
        });
    }
}

//Next, you need to display the current song title and artist in the player display.
const setPlayerDisplay = () => {
    //Access the #player-song-title and #player-song-artist elements with the getElementById() method. Assign them to variables playingSong and songArtist respectively.
    const playingSong = document.getElementById("player-song-title");
    const songArtist = document.getElementById("player-song-artist");
    //Access the userData?.currentSong?.title and userData?.currentSong?.artist properties and assign them to a currentTitle and currentArtist variables respectively.
    const currentTitle = userData?.currentSong?.title;
    const currentArtist = userData?.currentSong?.artist;
    //Use a ternary operator to check if currentTitle evaluates to a truthy value. If it does, set playingSong.textContent to currentTitle. Otherwise, set it to an empty string.
    playingSong.textContent = currentTitle ? currentTitle : "";
    //Use a ternary operator to check if currentArtist is truthy. If so, set songArtist.textContent to currentArtist. Otherwise, set it to empty string.
    songArtist.textContent = currentArtist ? currentArtist : "";
}
//If you check closely, you'd see the currently playing song is not highlighted in the playlist, so you don't really know which song is playing. You can fix this by creating a function to highlight any song that is being played.Using an arrow syntax, create a highlightCurrentSong function.
const highlightCurrentSong = () => {
    //Inside the function, use querySelectorAll to get the .playlist-song element and assign to a playlistSongElements constant.
    const playlistSongElements = document.querySelectorAll(".playlist-song");
    //You need to get the id of the currently playing song.Use getElementById() to get the id of the currently playing song, then use template literals to prefix it with song-. Assign it to the constant songToHighlight.
    const songToHighlight = document.getElementById(`song-${userData?.currentSong?.id}`);
    //The forEach method is used to loop through an array and perform a function on each element of the array.Use the forEach method on playlistSongElements. Pass in songEl as the parameter and use arrow syntax to add in an empty callback.
    playlistSongElements.forEach((songEl) => {
        //Use the removeAttribute() method to remove the "aria-current" attribute. This will remove the attribute for each of the songs.
        songEl.removeAttribute("aria-current");
    });
    //Now you need to add the attribute back to the currently playing song.Create an if statement with the condition songToHighlight.
    if (songToHighlight) {
        //Use setAttribute on songToHighlight to pass in "aria-current" and "true" as the first and second arguments.
        songToHighlight.setAttribute("aria-current", "true");
    }
}

//Use the arrow function syntax to create a renderSongs function that takes in array as its parameter.
const renderSongs = (array) => {
    /*//Using const declare a variable named songsHTML and assign it array.map().
    const songsHTML=array.map();*/

    /*//The map() method is used to iterate through an array and return a new array. It's helpful when you want to create a new array based on the values of an existing array.Pass in a callback function to the map() method. The callback function should take song as a parameter, use the arrow function syntax, and have an empty body.
    const songsHTML = array.map((song)=>{});*/

    /*//Inside the map(), add a return statement with backticks where you will interpolate all the elements responsible to displaying the song details.Inside the backticks, create an li element with an id attribute of song-${song.id} and a class attribute of playlist-song.
    const songsHTML = array.map((song)=>{
      return `<li id="song-${song.id}" class="playlist-song"></li>`;
    });*/

    /*//Create a button element with class playlist-song-info. Inside the button, add a span element with the class playlist-song-title, then interpolate song.title as the text.
    const songsHTML = array.map((song) => {
        return `
        <li id="song-${song.id}" class="playlist-song"></li>
        <button class="playlist-song-info">
            <span class="playlist-song-title"> ${song.title}</span>
            <span class="playlist-song-artist">${song.artist}</span>
            <span class="playlist-song-duration">${song.duration}</span>
        </button>
        <button class="playlist-song-delete" aria-label="Delete ${song.title}"><svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#4d4d62"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.32587 5.18571C5.7107 4.90301 6.28333 4.94814 6.60485 5.28651L8 6.75478L9.39515 5.28651C9.71667 4.94814 10.2893 4.90301 10.6741 5.18571C11.059 5.4684 11.1103 5.97188 10.7888 6.31026L9.1832 7.99999L10.7888 9.68974C11.1103 10.0281 11.059 10.5316 10.6741 10.8143C10.2893 11.097 9.71667 11.0519 9.39515 10.7135L8 9.24521L6.60485 10.7135C6.28333 11.0519 5.7107 11.097 5.32587 10.8143C4.94102 10.5316 4.88969 10.0281 5.21121 9.68974L6.8168 7.99999L5.21122 6.31026C4.8897 5.97188 4.94102 5.4684 5.32587 5.18571Z" fill="white"/></svg></button>
        `;
    });*/

    //Right now the songsHTML is an array. If you tried to display this as is, you would see the songs separated by commas. This is not the desired outcome because you want to display the songs as a list. To fix this, you will need to join the array into a single string by using the join() method.The join() method is used to concatenate all the elements of an array into a single string. It takes an optional parameter called a separator which is used to separate each element of the array.
    const songsHTML = array.map((song) => {//To play the song anytime the user clicks on it, add an onclick attribute to the first button element. Inside the onclick, call the playSong function with song.id.
        return `
        <li id="song-${song.id}" class="playlist-song"></li>
        <button class="playlist-song-info" onclick="playSong(${song.id})">
            <span class="playlist-song-title"> ${song.title}</span>
            <span class="playlist-song-artist">${song.artist}</span>
            <span class="playlist-song-duration">${song.duration}</span>
        </button>
        <button class="playlist-song-delete" aria-label="Delete ${song.title}" onclick="deleteSong(${song.id})"><svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#4d4d62"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.32587 5.18571C5.7107 4.90301 6.28333 4.94814 6.60485 5.28651L8 6.75478L9.39515 5.28651C9.71667 4.94814 10.2893 4.90301 10.6741 5.18571C11.059 5.4684 11.1103 5.97188 10.7888 6.31026L9.1832 7.99999L10.7888 9.68974C11.1103 10.0281 11.059 10.5316 10.6741 10.8143C10.2893 11.097 9.71667 11.0519 9.39515 10.7135L8 9.24521L6.60485 10.7135C6.28333 11.0519 5.7107 11.097 5.32587 10.8143C4.94102 10.5316 4.88969 10.0281 5.21121 9.68974L6.8168 7.99999L5.21122 6.31026C4.8897 5.97188 4.94102 5.4684 5.32587 5.18571Z" fill="white"/></svg></button>
        `;
    }).join("");
    //Assign songsHTML to the innerHTML property of the playlistSongs element. This will insert the li element you just created into the ul element in the already provided HTML file.
    playlistSongs.innerHTML = songsHTML;
};
//This function will set the aria-label attribute to the current song, or to the first song in the playlist. And if the playlist is empty, it sets the aria-label to "Play".
const setPlayButtonAccessibleText = () => {
    //You need to get the currently playing song or the first song in the playlist. To do that, create a song constant and use the OR operator (||) to set it to the current song of userData, or the first song in the userData?.songs array.
    const song = userData?.currentSong || userData?.songs[0];
    //Use the setAttribute method on the playButton element to set an attribute named aria-label. For the value, use a ternary to set song?.title to Play ${song.title} or "Play" if there's no song.title available.
    playButton.setAttribute("aria-label", song?.title ? `Play ${song.title}` : "Play");
}

//Before you start working on playing the next and previous song, you need to get the index of each song in the songs property of userData.
const getCurrentSongIndex = () => {
    //Return userData?.songs.indexOf(). For the indexOf() argument, set it to userData?.currentSong.
    return userData?.songs.indexOf(userData?.currentSong);
}

//Add the functionality to the play button so that it will play the current song when it is clicked on.Use the addEventListener() method and pass in a click event for the first argument and an empty callback function with arrow syntax for the second argument.
playButton.addEventListener("click", () => {
    //Within the arrow function of the event listener, add an if to check if userData?.currentSong is falsey.
    if (!userData?.currentSong) {
        //Call the playSong() function with the id of the first song in the userData?.songs array. This will ensure the first song in the playlist is played first.
        playSong(userData?.songs[0].id);
    }//Add an else block. Inside the else block, call the playSong function with the id of the currently playing song as an argument.This ensures that the currently playing song will continue to play when the play button is clicked.
    else {
        playSong(userData?.currentSong.id);
    }
});
//Add a click event listener to the pauseButton element, then pass in pauseSong as the second argument of the event listener. This is the function the event listener will run.
pauseButton.addEventListener("click", pauseSong);
//Add a click event listener to the nextButton element, then pass in playNextSong as the second argument of your event listener. This is the function the event listener will run.
nextButton.addEventListener("click", playNextSong);
//Add a click event listener to the previousButton element, then pass in playPreviousSong as the second argument.
previousButton.addEventListener("click", playPreviousSong);
//Add a click event listener to the shuffleButton element. For the function to run, pass in the shuffle function.
shuffleButton.addEventListener("click", shuffle);
//Add an event listener to the audio element which listens for the ended event. Pass in a callback using arrow syntax with empty curly braces.
audio.addEventListener("ended",()=>{
    //Next, you need to check if there is a next song to play. Retrieve the current song index by calling the getCurrentSongIndex() function, and save it in a currentSongIndex constant.
    const currentSongIndex = getCurrentSongIndex();
    //After that, create a nextSongExists constant that contains the boolean value true or false depending on if the next song exists.
    const nextSongExists = userData?.songs[currentSongIndex + 1] !== undefined;
    //Use an if statement to check if nextSongExists exists, then call the playNextSong() function in the if block. This will automatically play the next song when the current song ends.
    if(nextSongExists){
        playNextSong();
    }//If there is no next song in the playlist, use the else block to reset the currentSong key of userData to null, and its songCurrentTime property to 0.
    else{
        userData.currentSong=null;
        userData.songCurrentTime=0;
    }
    //With everything set in place, call the pauseSong(), setPlayerDisplay(), highlightCurrentSong(), and setPlayButtonAccessibleText() functions to correctly update the player.
    pauseSong();
    setPlayerDisplay();
    highlightCurrentSong();
    setPlayButtonAccessibleText();
});
//Now that you have the list of songs displayed on the screen, it would be nice to sort them in alphabetical order by title.
const sortSongs = () => {
    /*//Inside your sortSongs function, add the sort() method to userData?.songs.
    userData?.songs.sort();*/

    /*//To sort the songs in alphabetical order by title, you will need to pass in a compare callback function into your sort() method.But for now, add an empty callback function to your sort() method and use a and b for the parameter names.
    userData?.songs.sort((a,b)=>{});*/

    //The sort() method accepts a compare callback function that defines the sort order.In this example, the first condition (a.name < b.name) checks if the name of the first fruit is less than the name of the second fruit. If so, the first fruit is sorted before the second fruit.Strings are compared lexicographically which means they are compared character by character. For example, "Apples" is less than "Bananas" because "A" comes before "B" in the alphabet.The reason why this example is returning numbers is because the sort() method is expecting a number to be returned. If you return a negative number, the first item is sorted before the second item.
    userData?.songs.sort((a, b) => {
        if (a.title < b.title) {
            return -1;
        }
        //The second condition in this example checks if a.name > b.name. If so, the function returns 1, which sorts the first fruit after the second fruit.
        if (a.title > b.title) {
            return 1;
        }
        //If a.name is equal to b.name, then the function returns 0. This means that nothing changes and the order of a and b remains the same.
        return 0;
    });
    //The last step for the sortSongs function is to return userData?.songs.
    return userData?.songs;
};

/*//Now you need to call the renderSongs function and pass in userData?.songs in order to finally display the songs in the UI.Optional chaining (?.) helps prevent errors when accessing nested properties that might be null or undefined.Returns undefined instead of throwing an error
renderSongs(userData?.songs);*/

//Right now the song order has not changed. That is because the updates you made using the sort method will not happen until the sortSongs function is called.Change your renderSongs function to call the sortSongs function.
renderSongs(sortSongs());