import * as builder from 'botbuilder';
import * as emoji from 'node-emoji';

import * as util from '../util';
import ssml from '../ssml';

import { speech } from '../resources/test';

let debugDialog = (session: builder.Session) => {
  let title = "Debug output";
  let description = `#### Raw:${util.br()}${speech.demo}`;

  let msg = new builder.Message(session)
      .text(util.formatCard(title, description))
      .speak(speech.demo)
      .inputHint(builder.InputHint.acceptingInput);

  session.send(msg).endDialog();
};

export default debugDialog;