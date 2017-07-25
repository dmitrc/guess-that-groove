import * as builder from 'botbuilder';
import * as emoji from 'node-emoji';

import * as util from '../util';
import ssml from '../ssml';

let gameDialog = 
[
    (session: builder.Session) => {
        let title = `Welcome!`;
        let description = 'Rules of the game go here...';

        let msg = new builder.Message(session)
            .text(util.formatCard(title, description))
            .speak(description)
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

        let title = `Final results`;
        let description = `After ${results.response.turn} turns, your score is ${results.response.score}`;

        let msg = new builder.Message(session)
            .text(util.formatCard(title, description))
            .speak(description)
            .inputHint(builder.InputHint.acceptingInput);

        session.send(msg).endDialog();
    }
];

export default gameDialog;