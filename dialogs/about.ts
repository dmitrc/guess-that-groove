import * as builder from 'botbuilder';
import * as emoji from 'node-emoji';

import * as util from '../util';
import ssml from '../ssml';

let aboutDialog = (session: builder.Session) => {
    let title = 'About this bot';
    let description = `Made with ${emoji.get('heart')} by **Team Caribou**.${util.br(2)}*No digital assistants were harmed in making of this bot.*`;

    let speech = new ssml();
    speech.say('This bot was made with love by Team Caribou.');
    speech.pause('500ms');
    speech.prosody('No digital assistants were harmed in making of this bot.', { volume: 'soft', rate: 'fast' });

    let msg = new builder.Message(session)
        .text(util.formatCard(title, description))
        .speak(speech.ssml())
        .inputHint(builder.InputHint.acceptingInput);

    session.send(msg).endDialog();
};

export default aboutDialog;