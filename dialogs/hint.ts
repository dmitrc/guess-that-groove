import * as builder from 'botbuilder';
import * as emoji from 'node-emoji';

import * as util from '../util';
import ssml from '../ssml';

import r from '../resources/round';

let hintDialog = (session: builder.Session, args: any) => {
    let artist = '%ArtistName%';
    let msg = new builder.Message(session)
        .text(util.formatCard(r.hint.title, r.hint.descriptionFn(artist)))
        .speak(r.hint.speechFn(artist))
        .inputHint(builder.InputHint.ignoringInput);

    session.send(msg).endDialog();
};

export default hintDialog;