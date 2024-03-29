import * as builder from 'botbuilder';
import * as emoji from 'node-emoji';

import * as util from '../util';
import * as server from '../server';
import ssml from '../ssml';

import r from '../resources/game';

let demoMode = true;
let gameDialog = 
[
    (session: builder.Session) => {
        let msg = new builder.Message(session)
            .text(util.formatCard(r.intro.title, r.intro.description))
            .speak(r.intro.speech)
            .inputHint(builder.InputHint.ignoringInput);

        session.send(msg);
        session.beginDialog('RoundDialog');
    },

    (session: builder.Session, args: any, next: any) => {
        let c = session.conversationData;

        let msg = new builder.Message(session)
            .text(util.formatCard(r.results.title, r.results.descriptionFn(c.score)))
            .speak(r.results.speechFn(c.score))
            .inputHint(builder.InputHint.ignoringInput);

        session.send(msg);
        next && next();
    },

    // Optional step for the Science Fair demo: record the username here (instead of Cortana's presets)
    (session: builder.Session, args: any, next: any) => {
        if (demoMode) {
            let msg = new builder.Message(session)
                .text(util.formatCard(r.namePrompt.title, r.namePrompt.description))
                .speak(r.namePrompt.speech);

            builder.Prompts.text(session, msg);
        }
        else {
            next && next();
        }
    },

    (session: builder.Session, results: any) => {
        let c = session.conversationData;

        let user = null;
        if (demoMode && results.response) {
            user = util.trim(results.response);
        }

        let title = user ? r.outro.titleFn(user) : r.outro.title;

        let msg = new builder.Message(session)
            .text(util.formatCard(title, r.outro.description))
            .speak(r.outro.speech)
            .inputHint(builder.InputHint.acceptingInput);

        // Send the results!
        let gameId = "1";
        console.log(`[LOG] Submitting results with gameId=${gameId}, userId=${user || "Anonymous"}, results=${JSON.stringify(c.results)}`);

        server.postGameResults(gameId, user || "Anonymous", c.results, (isSuccess: boolean) => {
            console.log(`[LOG] Submitting game results was ${isSuccess ? "" : "not"} successful.`);
        });
        
        // Reset all the things!
        c.inProgress = false;
        session.endConversation(msg);
    }
];

export default gameDialog;