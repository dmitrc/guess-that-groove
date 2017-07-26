import * as builder from 'botbuilder';
import * as emoji from 'node-emoji';

import * as util from '../util';
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
           c.stats = [];

           c.inProgress = true;
        }

        let url = "https://guessthatgroove.blob.core.windows.net/songs/1960s%20Byrds%20-%20Mr.%20Tambourine%20Man.mp3";
        let msg = new builder.Message(session)
            .text(util.formatCard(r.intro.titleFn(c.round), r.intro.descriptionFn(c.round)))
            .speak(r.intro.speechFn(c.round, url))
            .inputHint(builder.InputHint.expectingInput);
        
        // TODO: Add the guess prompt
        // TODO: Ummm, add the audio itself?

        builder.Prompts.text(session, msg, {
            retryPrompt: msg,
            retrySpeak: r.intro.speechFn(c.round, url)
        });
    },
    (session: builder.Session, results: builder.IPromptTextResult) => {
        let c = session.conversationData;

        // Insert some logic here
        c.score += 3;

        let msg = new builder.Message(session)
            .text(util.formatCard(r.results.titleFn(c.round), r.results.descriptionFn(c.round, c.score, true, true)))
            .speak(r.results.speechFn(c.round, true, true))
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