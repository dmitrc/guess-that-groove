import * as util from '../util';
import ssml from '../ssml';

let resultsDict: any = {
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

let gameResources = {
    intro: {
        title: "Guess that Groove!",
        description: "Try to guess the following four songs. You get one point for the artist or title, and three points if you get both. Let's begin!",
        speech: new ssml().say("OK, let's play Guess that Groove!").pause("300ms").say("Try to guess the following four Songs. You get one point for the artist or title, and three points if you get both. Let's begin!").toString()
    },
    results: {
        title: "Results",
        descriptionFn: (n: number) => {
            return `That's all the clips. You earned ${n} points. ${resultsDict[n]}`;
        },
        speechFn: (n: number) => {
            return new ssml().say(`That's all the clips. You earned ${n} points. ${resultsDict[n]}`).toString();
        }
    },
    outro: {
        title: "Thanks for playing!",
        description: "Come back tomorrow for a new daily challenge and more fun. And, of course, stay tuned for more features and game modes!",
        speech: new ssml().say("Thanks for playing! Come back tomorrow for a new daily challenge and more fun!").toString()
    }
};

export default gameResources;