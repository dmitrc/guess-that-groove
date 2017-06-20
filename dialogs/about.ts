import * as builder from 'botbuilder';
import * as emoji from 'node-emoji';

import * as util from '../util';
var Speech = require('ssml-builder');

let aboutDialog = (session: builder.Session) => {
    let title = 'About this bot';
    let description = `Made with ${emoji.get('heart')} by **Dmitrii Cucleschin**.${util.br(2)}${emoji.get('earth_americas')} [https://dmitrii.it](https://dmitrii.it)${util.br()}${emoji.get('email')} [dmitrii.cucleschin@gmail.com](mailto:dmitrii.cucleschin@gmail.com)${util.br(2)}*No digital assistants were harmed in making of this bot.*`;

    let speech = new Speech();
    speech.say('This bot was made with love by');
    speech.phoneme('ipa', `dmi'tɹɪj kʊkljɛ'ʃkin`, 'Dmitrii Cucleschin');
    speech.pause("300ms");
    speech.prosody({ volume: "soft", rate: "fast" }, 'No digital assistants were harmed in making of this bot.');

    let msg = new builder.Message(session)
        .text(util.formatCard(title, description))
        .speak(util.ssml(speech))
        .inputHint(builder.InputHint.acceptingInput);

    session.send(msg).endDialog();
};

export default aboutDialog;