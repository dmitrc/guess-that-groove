import * as builder from 'botbuilder';
import * as emoji from 'node-emoji';

import * as util from '../util';
import ssml from '../ssml';

let debugDialog = (session: builder.Session, args: any) => {
  let title = "Debug output";
  let description = `#### Args:${util.br()}${JSON.stringify(args)}`;

  let speech = new ssml();
  speech.say('I am in the debug mode. Contents of the arguments object have been saved and can be previewed in the companion app.');

  let msg = new builder.Message(session)
      .text(util.formatCard(title, description))
      .speak(speech.ssml())
      .inputHint(builder.InputHint.acceptingInput);

  session.send(msg).endDialog();
};

export default debugDialog;