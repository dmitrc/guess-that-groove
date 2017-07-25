import * as util from '../util';
import ssml from '../ssml';

let strings: any = {};

// Start of Game stuff
strings.Intro =
    new ssml()
    .say("OK, let's play Guess that Groove!")
    .pause("300ms")
    .say("Try to guess the following five Songs. You get one point for the artist or title, and three points if you get both. Let's begin!")
    .toString();

// Pick a decade
// Pick an artist


// Cortana says these before playing a clip
strings.IntroduceClipN = function(n: number){
    let dict: any = {
        1: "first",
        2: "second",
        3: "third",
        4: "fourth",
        5: "fifth"
    }; 
    let speech = new ssml();
    speech.say(`Here is the ${dict(n)} clip`);
    return speech.toString();
}

// Cortana prompts a response after playing a clip
strings.AskUserForGuess =
    new ssml()
    .say("What's your guess?")
    .toString();

// Responses to correct guesses
strings.CorrectArtist =
    new ssml()
    .say("You got the artist.")
    .toString();

strings.CorrectTitle =
    new ssml()
    .say("You got the song name.")
    .toString();

strings.CorrectArtistTitle =
    new ssml()
    .say("Whoa, nice! That's three points!")
    .toString();

// Responses to partially correct guesses
strings.IncorrectArtist=
    new ssml()
    .say("That's not it.")
    .toString();

strings.IncorrectArtist=
    new ssml()
    .say("That's not it.")
    .toString();
// Response to a totally incorrect guess


strings.demo = strings.IntroduceClipN(4);
export default strings;