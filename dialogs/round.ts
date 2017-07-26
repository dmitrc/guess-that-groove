import * as builder from 'botbuilder';
import * as emoji from 'node-emoji';

import * as util from '../util';
import ssml from '../ssml';

import { speech, title, text } from '../strings/test';

let roundDialog = 
[
    (session: builder.Session, args: any) => {
        if (!args || !args.inProgress) {
            session.conversationData.step = 0;
            session.conversationData.score = 0;
            session.conversationData.total = 4;
            session.conversationData.steps = [];
        }

        // Increment the turn before starting
        ++session.conversationData.step;

        let msg = new builder.Message(session)
            .text(util.formatCard(title.RoundN(session.conversationData.step), text.IntroduceClipN(session.conversationData.step)))
            .speak(speech.IntroduceClipN(session.conversationData.step))
            .inputHint(builder.InputHint.expectingInput);
        
        // TODO: Add the guess prompt
        // TODO: Ummm, add the audio itself?

        builder.Prompts.text(session, msg, {
            retryPrompt: text.IntroduceClipN(session.conversationData.step),
            retrySpeak: speech.IntroduceClipN(session.conversationData.step)
        });
    },
    (session: builder.Session, results: builder.IPromptTextResult) => {
        // Insert some logic here
        session.conversationData.score += 3;

        let msg = new builder.Message(session)
            .text(util.formatCard(title.RoundN(session.conversationData.step), text.CorrectArtistTitle))
            .speak(speech.CorrectArtistTitle)
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