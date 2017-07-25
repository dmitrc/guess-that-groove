import * as builder from 'botbuilder';
import * as emoji from 'node-emoji';

import * as util from '../util';
import ssml from '../ssml';

let roundDialog = [
        (session: builder.Session, args: any) => {
            if (args) {
                session.conversationData.step = args.step || 1;
                session.conversationData.score = args.score || 0;
                session.conversationData.total = args.total || 5;
            }

            let title = `Round ${session.conversationData.step}`;
            let description = 'Please listen to this round\'s song... What is your guess?';

            let msg = new builder.Message(session)
                .text(util.formatCard(title, description))
                //.speak(speech.ssml())
                .inputHint(builder.InputHint.expectingInput);

            builder.Prompts.text(session, msg);
        },
        (session: builder.Session, results: builder.IPromptTextResult) => {
            session.conversationData.score += 1;

            let title = `Round ${session.conversationData.step} results`;
            let description = `Your answer was ${results.response}. Your score is ${session.conversationData.score}`;

            let msg = new builder.Message(session)
                .text(util.formatCard(title, description))
                //.speak(speech.ssml())
                .inputHint(builder.InputHint.expectingInput);

            session.send(msg);
            
            if (session.conversationData.round < session.conversationData.total) {
                session.replaceDialog('RoundDialog', {
                    step: ++session.conversationData.step,
                    score: ++session.conversationData.score,
                    total: session.conversationData.total
                });
            }
            else {
                session.endDialogWithResult({
                    response: {
                        step: session.conversationData.step,
                        answer: results.response,
                        score: session.conversationData.score 
                    }
                });
            }
        }
    ];

export default roundDialog;