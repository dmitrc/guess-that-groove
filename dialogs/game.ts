import * as builder from 'botbuilder';
import * as emoji from 'node-emoji';

import * as util from '../util';
import ssml from '../ssml';

import { speech, title, text } from '../strings/test';

let gameDialog = 
[
    (session: builder.Session) => {
        let msg = new builder.Message(session)
            .text(util.formatCard(title.Intro, text.Intro))
            .speak(speech.Intro)
            .inputHint(builder.InputHint.ignoringInput);

        session.send(msg);
        session.beginDialog('RoundDialog', { step: 1, score: 0, total: 5 });
    },
    (session: builder.Session, results: builder.IPromptResult<any> | undefined) => {
        if (!results || !results.response) {
            //something is wrong
            session.send("Oops, something is very wrong here").endDialog();
            return;
        }

        let msg = new builder.Message(session)
            .text(util.formatCard('Results', text.PointsReadout(results.response.score)))
            .speak(speech.PointsReadout(results.response.score))
            .inputHint(builder.InputHint.acceptingInput);

        session.send(msg).endDialog();
    }
];

export default gameDialog;