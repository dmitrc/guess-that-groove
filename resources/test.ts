import * as util from '../util';
import ssml from '../ssml';

export let speech: any = {};
export let title: any = {};
export let text: any = {};

// Start of Game stuff
title.Intro = "Guess that Groove!";
text.Intro = "Try to guess the following four songs. You get one point for the artist or title, and three points if you get both. Let's begin!"
speech.Intro =
    new ssml()
    .say("OK, let's play Guess that Groove!")
    .pause("300ms")
    .say("Try to guess the following four Songs. You get one point for the artist or title, and three points if you get both. Let's begin!")
    .toString();

// Hypothetical Game Types
// Daily challenge (Default game type: Five daily songs, guess artist+song)    
    // this string is hardcoded into Intro above

// Pick a decade (for game type: Single decade, guess artist+song)
speech.PickADecade = "What decade do you want?"

// Pick an artist (for game type: Single artist, guess the song)
speech.PickAnArtist = "Tell me an artist"

// Cortana says these before playing a clip
title.RoundN = function(n: number) {
    return `Round ${n}`;
}
text.IntroduceClipN = function(n: number){
    let dict: any = {
        1: "first one",
        2: "next clip",
        3: "third song",
        4: "last one"
    }; 
    return `Here is the ${dict[n]}`;
}
speech.IntroduceClipN = function(n: number){
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
text.AskUserForGuess = "What's your guess?";
speech.AskUserForGuess =
    new ssml()
    .say("What's your guess?")
    .toString();

//
// Potential responses to user input
//

// Responses to correct guesses
speech.CorrectArtist =
    new ssml()
    // .audio(ding.mp3)
    .say("One point for the artist!") 
    .toString();

speech.CorrectTitle =
    new ssml()
    // .audio(ding.mp3)
    .say("One point for the title!")
    .toString();

text.CorrectArtistTitle = "Excellent, a 3 point play!";
speech.CorrectArtistTitle =
    new ssml()
    // .audio(dingdingding.mp3)
    .say("Excellent, a 3 point play!")
    .toString();

// Responses to partially incorrect guesses
speech.CorrectArtistIncorrectTitle=
    new ssml()
    .say("Half right. One Point for the artist!")
    .toString();

speech.CorrectTitleIncorrectArtist=
    new ssml()
    .say("Half right. One Point for the title!")
    .toString();

// Response to a totally incorrect guess
speech.CorrectTitleIncorrectArtist=
    new ssml()
    .say("Nice try but no.")
    .toString();

// If the usre asks for a hint ("Hint" or "Give me a hint")
speech.Hint = function(artist: any){
    return new ssml()
    .say(`Sure, I'll get you half way there. The Artist is ${artist}. Now can you guess the title?`)
    .toString();
}

// If the user says "Again" or "Play it again"
text.Repeat = "Sure, here it is again:";
speech.Repeat =
    new ssml()
    .say("Sure, here it is again:")
    .toString();

// If the user says "I don't know" or "I give up". Just give them the answer. 
speech.TheAnswer = function(artist: any, title: any){
    return new ssml()
    .say(`That was ${title} by ${artist}.`)
    .toString();
}

//
// End of game 
//

// you got <n> points
text.PointsReadout = function(points: number){
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
    return `That's all the clips. You earned ${points} points. ${dict[points]}`;
}
speech.PointsReadout = function(points: number){
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

speech.demo = new ssml()
                .audio("https://guessthatgroove.blob.core.windows.net/songs/1960s%20Byrds%20-%20Mr.%20Tambourine%20Man.mp3")
                .toString();