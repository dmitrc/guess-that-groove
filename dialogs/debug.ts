import * as builder from 'botbuilder';
import * as emoji from 'node-emoji';

import * as util from '../util';
import ssml from '../ssml';

import testStrings from '../strings/test';

let debugDialog = (session: builder.Session) => {
  let speech = testStrings.demo;

  let title = "Debug output";
  let description = `#### Raw:${util.br()}${speech}`;

  let msg = new builder.Message(session)
      .text(util.formatCard(title, description))
      .speak(speech)
      .inputHint(builder.InputHint.acceptingInput);

  session.send(msg).endDialog();
};

export default debugDialog;