import * as builder from 'botbuilder';
import * as emoji from 'node-emoji';

import * as util from '../util';
import ssml from '../ssml';

let roundDialog = 
[
    (session: builder.Session, args: any) => {
        if (!args || !args.inProgress) {
            session.conversationData.step = 0;
            session.conversationData.score = 0;
            session.conversationData.total = 5;
            session.conversationData.steps = [];
        }

        // Increment the turn before starting
        ++session.conversationData.step;

        session.conversationData.steps[session.conversationData.step] = {
            song: {
                title: "Get Lucky",
                artist: "Daft Punk"
            },
            answer: null
        }

        let title = `Round ${session.conversationData.step}`;
        let description = 'Please listen to this round\'s song... What is your guess?';

        let msg = new builder.Message(session)
            .text(util.formatCard(title, description))
            .speak(description)
            .inputHint(builder.InputHint.expectingInput);

        builder.Prompts.text(session, msg, {
            retryPrompt: "What is your guess, again?",
            retrySpeak: "What is your guess, again?"
        });
    },
    (session: builder.Session, results: builder.IPromptTextResult) => {
        // Insert some logic here
        ++session.conversationData.score;

        let title = `Round ${session.conversationData.step} results`;
        let description = `Your answer was ${results.response}. Your score is ${session.conversationData.score}`;

        let msg = new builder.Message(session)
            .text(util.formatCard(title, description))
            .speak(description)
            .inputHint(builder.InputHint.ignoringInput);

        session.send(msg);
        
        if (session.conversationData.step < session.conversationData.total) {
            session.replaceDialog('RoundDialog', {
                inProgress: true
            });
        }
        else {
            session.endDialogWithResult({
                response: {
                    score: session.conversationData.score,
                    total: session.conversationData.total
                }
            });
        }
    }
];

export default roundDialog;