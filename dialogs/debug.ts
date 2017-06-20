import * as builder from 'botbuilder';
import * as emoji from 'node-emoji';

import * as util from '../util';
var Speech = require('ssml-builder');

let debugDialog = (session: builder.Session, args: any) => {
  let title = "Debug output";
  let description = `#### Args dump:${util.br()}${JSON.stringify(args)}`;

  let speech = new Speech();
  speech.say('I\'ve obtained the arguments dump! I am displaying it for you on the companion app.');

  let msg = new builder.Message(session)
      .text(util.formatCard(title, description))
      .speak(util.ssml(speech))
      .inputHint(builder.InputHint.acceptingInput);

  session.send(msg).endDialog();
};

export default debugDialog;