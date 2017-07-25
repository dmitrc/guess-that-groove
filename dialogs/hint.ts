import * as builder from 'botbuilder';
import * as emoji from 'node-emoji';

import * as util from '../util';
import ssml from '../ssml';

let hintDialog = (session: builder.Session, args: any) => {
    let title = `Here's a hint:`;
    let description = 'The __ of this song is __.';

    let msg = new builder.Message(session)
        .text(util.formatCard(title, description))
        //.speak(speech.ssml())
        .inputHint(builder.InputHint.ignoringInput);

    session.send(msg).endDialog();
};

export default hintDialog;