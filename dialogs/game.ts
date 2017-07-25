import * as builder from 'botbuilder';
import * as emoji from 'node-emoji';

import * as util from '../util';
import ssml from '../ssml';

let stepCount = 3;
let gameDialog = [
        (session: builder.Session, args: any) => {
            if (args && args.step) {
                session.dialogData.step = args.step;
            }
            else {
                session.dialogData.step = 1;
                session.conversationData.score = 0;
            }

            let title = `Round ${session.dialogData.step}`;
            let description = 'Please listen to this round\'s song';

            let msg = new builder.Message(session)
                .text(util.formatCard(title, description))
                //.speak(speech.ssml())
                .inputHint(builder.InputHint.expectingInput);

            builder.Prompts.text(session, msg);
        },
        (session: builder.Session, results: builder.IPromptTextResult) => {
            let title = `Round ${session.dialogData.step} results`;
            let description = `Your answer was ${results.response}`;

            let msg = new builder.Message(session)
                .text(util.formatCard(title, description))
                //.speak(speech.ssml())
                .inputHint(builder.InputHint.expectingInput);

            session.send(msg);
            session.conversationData.score += 1;

            if (session.dialogData.step < stepCount) {
                session.replaceDialog('GameDialog', { step: session.dialogData.step + 1 })
            }
            else {
                let title = `Results`;
                let description = `Your score was ${session.conversationData.score}`;

                let msg = new builder.Message(session)
                    .text(util.formatCard(title, description))
                    //.speak(speech.ssml())
                    .inputHint(builder.InputHint.expectingInput);

                session.send(msg).endDialog();
            }
        }
    ];


export default gameDialog;