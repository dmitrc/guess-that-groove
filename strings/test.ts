import * as util from '../util';
import ssml from '../ssml';

let strings: any = {};

strings.sage =
    new ssml()
    .say("Hello!")
    .pause("330ms")
    .say("How are you doing?")
    .toString();

strings.sage2 =
    new ssml()
    .say("What do you want for dinner?")
    .pause("330ms")
    .say("I would like chinese")
    .toString();

// Start of Game stuff
strings.Intro =
    new ssml()
    .say("OK, let's play Guess that Groove!")
    .pause("300ms")
    .say("Try to guess the following five Songs. You get one point for the artist or title, and three points if you get both. Let's begin!")
    .toString();

// Cortana says these before playing a clip
strings.PreClip1 =
    new ssml()
    .say("Here's the first one")
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


strings.demo = strings.Intro
export default strings;