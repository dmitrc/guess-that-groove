import * as util from '../util';
import ssml from '../ssml';

let indexDict: any = {
    1: "first one",
    2: "next clip",
    3: "third song",
    4: "last one"
};

let roundResources = {
    intro: {
        titleFn: (n: number) => {
            return `Round #${n}`;
        },
        descriptionFn: (n: number) => {
            return `Here is the ${indexDict[n]}.\n\nWhat's your guess?`;
        },
        speechFn: (n: number, url: string) => {
            return new ssml().say(`Here is the ${indexDict[n]}.`).pause("330ms").audio(url).pause("330ms").say("What's your guess?").toString();
        }
    },
    results: {
        titleFn: (n: number ) => {
            return `Round #${n} - Results`;
        },
        descriptionFn: (n: number, score: number, didGuessArtist: boolean, didGuessSong: boolean) => {
            let t = "";
            if (didGuessArtist && didGuessSong) {
                t += 'Excellent, a 3 point play!';
            }
            else if (didGuessArtist) {
                t += 'Half right. One point for the artist!'
            }
            else if (didGuessSong) {
                t += 'Half right. One point for the title!';
            }
            else {
                t += 'Nice try, but no.'
            }

            t += `\n\nYour score so far is ${score} points out of ${n*3}.`;

            return t;
        },
        speechFn: (n: number, didGuessArtist: boolean, didGuessSong: boolean) => {
            let s = new ssml();
            if (didGuessArtist && didGuessSong) {
                s.say('Excellent, a 3 point play!');
            }
            else if (didGuessArtist) {
                s.say('Half right. One point for the artist!');
            }
            else if (didGuessSong) {
                s.say('Half right. One point for the title!');
            }
            else {
                s.say('Nice try, but no.');
            }

            return s.toString();
        }
    },
    hint: {
        title: "Here's a hint",
        descriptionFn: (artist: string) => {
            return `Sure, I'll get you half way there. The Artist is ${artist}. Now can you guess the title?`;
        },
        speechFn: (artist: string) => {
            return new ssml().say(`Sure, I'll get you half way there. The Artist is ${artist}. Now can you guess the title?`).toString();
        }
    },
    answer: {
        title: '',
        descriptionFn: (artist: string, title: string) => {
            return `That was ${title} by ${artist}.`;
        },
        speechFn: (artist: string, title: string) => {
            return new ssml().say(`That was ${title} by ${artist}.`).toString();
        }
    },
    error: {
        title: 'Oops!',
        description: 'Something went wrong when retrieving a song. Please try again in a little bit.',
        speech: new ssml().say('I am sorry, something went wrong when retrieving a song. Please try again in a little bit.').toString()
    }
};

export default roundResources;