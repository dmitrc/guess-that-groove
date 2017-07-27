import * as builder from 'botbuilder';
import * as emoji from 'node-emoji';

import * as util from '../util';
import * as server from '../server';
import ssml from '../ssml';

import r from '../resources/round';

let roundDialog = 
[
    (session: builder.Session, args: any) => {
        let c = session.conversationData;

        if (!c.inProgress) {
           c.round = 1;
           c.score = 0;
           c.total = 4;
           c.results = [];
           c.currentSong = null;

           c.inProgress = true;
        }

        let seenSongs = c.results.map((i: any) => {
            return i.songId;
        });

        console.log(`[LOG] Getting new song, except one of these ids: ${JSON.stringify(seenSongs)}`);

        server.getSong((obj: any, err: any) => {
            if (obj) {
                c.currentSong = obj;
                console.log(`[LOG] Got song from the backend: ${JSON.stringify(obj)}`);

                let msg = new builder.Message(session)
                    .text(util.formatCard(r.intro.titleFn(c.round), r.intro.descriptionFn(c.round)))
                    .speak(r.intro.speechFn(c.round, obj.url))
                    .inputHint(builder.InputHint.expectingInput);

                builder.Prompts.text(session, msg, {
                    retryPrompt: msg,
                    retrySpeak: r.intro.speechFn(c.round, obj.url)
                });
            }
            else {
                let msg = new builder.Message(session)
                    .text(util.formatCard(r.error.title, r.error.description))
                    .speak(r.error.speech)
                    .inputHint(builder.InputHint.acceptingInput);

                // Abandon all the hope
                session.endConversation(msg);
            }
        }, seenSongs);
    },
    (session: builder.Session, results: builder.IPromptTextResult) => {
        let c = session.conversationData;
        let a = util.trim(results.response || "");

        // THIS NEEDS SOME FINETUNING!
        let didGuessArtist = a.indexOf(util.trim(c.currentSong.artist)) > -1;
        let didGuessTitle = a.indexOf(util.trim(c.currentSong.title)) > -1;

        console.log(`[LOG] Guessed: ${results.response}, Actual: ${c.currentSong.artist} - ${c.currentSong.title}`);

        let pts = (didGuessArtist && didGuessTitle) ? 3 : (didGuessArtist || didGuessTitle) ? 1 : 0;
        c.score += pts;

        c.results[c.round - 1] = {
            songId: c.currentSong.songId,
            score: pts
        };

        let msg = new builder.Message(session)
            .text(util.formatCard(r.results.titleFn(c.round), r.results.descriptionFn(c.round, c.score, didGuessArtist, didGuessTitle)))
            .speak(r.results.speechFn(c.round, didGuessArtist, didGuessTitle))
            .inputHint(builder.InputHint.ignoringInput);

        session.send(msg);
        
        if (c.round < c.total) {
            c.round += 1;
            session.replaceDialog('RoundDialog');
        }
        else {
            session.endDialog();
        }
    }
];

export default roundDialog;