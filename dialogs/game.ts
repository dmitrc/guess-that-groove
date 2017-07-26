import * as builder from 'botbuilder';
import * as emoji from 'node-emoji';

import * as util from '../util';
import ssml from '../ssml';

import r from '../resources/game';

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

    (session: builder.Session, args: any, next: Function) => {
        let c = session.conversationData;

        let msg = new builder.Message(session)
            .text(util.formatCard(r.results.title, r.results.descriptionFn(c.score)))
            .speak(r.results.speechFn(c.score))
            .inputHint(builder.InputHint.ignoringInput);

        session.send(msg);
        next && next();
    },

    (session: builder.Session) => {
        let c = session.conversationData;

        let msg = new builder.Message(session)
            .text(util.formatCard(r.outro.title, r.outro.description))
            .speak(r.outro.speech)
            .inputHint(builder.InputHint.acceptingInput);

        c.round = 0;
        c.score = 0;
        session.endConversation(msg);
    }
];

export default gameDialog;