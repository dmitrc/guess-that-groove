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


strings.Intro =
    new ssml()
    .say("Let's play Guess that Song!")
    .pause("300ms")
    .say("Try to guess the following five Songs. You get one point for the artist or title, and three points if you get both. Let's begin!")
    .toString();

strings.demo = strings.Intro

export default strings;