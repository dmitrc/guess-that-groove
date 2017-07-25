import * as util from '../util';
import ssml from '../ssml';

let strings: any = {};

// Start of Game stuff
strings.Intro =
    new ssml()
    .say("OK, let's play Guess that Groove!")
    .pause("300ms")
    .say("Try to guess the following four Songs. You get one point for the artist or title, and three points if you get both. Let's begin!")
    .toString();


// Hypothetical Game Types
// Daily challenge (Default game type: Five daily songs, guess artist+song)    
    // this string is hardcoded into Intro above

// Pick a decade (for game type: Single decade, guess artist+song)
strings.PickADecade = "What decade do you want?"

// Pick an artist (for game type: Single artist, guess the song)
strings.PickAnArtist = "Tell me an artist"

// Cortana says these before playing a clip
strings.IntroduceClipN = function(n: number){
    let dict: any = {
        1: "first",
        2: "next",
        3: "third",
        4: "last one"
    }; 
    let speech = new ssml();
    speech.say(`Here is the ${dict[n]} clip`);
    return speech.toString();
}

// Cortana prompts a response after playing a clip
strings.AskUserForGuess =
    new ssml()
    .say("What's your guess?")
    .toString();

//
// Potential responses to user input
//

// Responses to correct guesses
strings.CorrectArtist =
    new ssml()
    // .audio(ding.mp3)
    .say("One point for the artist!") 
    .toString();

strings.CorrectTitle =
    new ssml()
    // .audio(ding.mp3)
    .say("One point for the title!")
    .toString();

strings.CorrectArtistTitle =
    new ssml()
    // .audio(dingdingding.mp3)
    .say("Excellent, a 3 point play!")
    .toString();

// Responses to partially incorrect guesses
strings.CorrectArtistIncorrectTitle=
    new ssml()
    .say("Half right. One Point for the artist!")
    .toString();

strings.CorrectTitleIncorrectArtist=
    new ssml()
    .say("Half right. One Point for the title!")
    .toString();

// Response to a totally incorrect guess
strings.CorrectTitleIncorrectArtist=
    new ssml()
    .say("Nice try but no.")
    .toString();

// If the usre asks for a hint ("Hint" or "Give me a hint")
strings.Hint = function(artist: any){
    return new ssml()
    .say(`Sure, I'll get you half way there. The Artist is ${artist}. Now can you guess the title?`)
    .toString();
}

// If the user says "Again" or "Play it again"
strings.CorrectTitleIncorrectArtist=
    new ssml()
    .say("Here's it is again.")
    .toString();

// If the user says "I don't know" or "I give up". Just give them the answer. 
strings.TheAnswer = function(artist: any, title: any){
    return new ssml()
    .say(`That was ${title} by ${artist}.`)
    .toString();
}

//
// End of game 
//

// you got <n> points
strings.PointsReadout = function(points: number){
    let dict: any = {
        0: "Try cleaning the wax out of your ears!",
        1: "At least you got on the board.",
        2: "The important thing is, you showed up.",
        3: "Nice hustle!",
        4: "Keep practicing!",
        5: "Not so bad.",
        6: "You might be a contender.",
        7: "Not too shabby.",
        8: "You've got potential!",
        9: "That's impressive!",
        10: "You're ready for the next level!",
        11: "Just 1 short of perfection!",
        12: "That's a perfect score! You're a real audiophile."
    }; 
    let speech = new ssml();
    speech.say(`That's all the clips. You earned ${points} points. ${dict[points]}`)
    return speech.toString();
}

strings.demo = new ssml()
                .audio("https://guessthatgroove.blob.core.windows.net/songs/1960s%20Byrds%20-%20Mr.%20Tambourine%20Man.mp3")
                .toString();
export default strings;