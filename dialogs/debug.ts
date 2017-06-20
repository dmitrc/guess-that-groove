import * as builder from 'botbuilder';
import * as emoji from 'node-emoji';

import * as util from '../util';
import ssml from '../ssml';

let debugDialog = (session: builder.Session, args: any) => {
  let title = "Debug output";
  let description = `#### Args dump:${util.br()}${JSON.stringify(args)}`;

  let speech = new ssml();
  speech.say('I have obtained the full dump of the arguments object! I am displaying it for you on the companion app.');

  let msg = new builder.Message(session)
      .text(util.formatCard(title, description))
      .speak(speech.ssml())
      .inputHint(builder.InputHint.acceptingInput);

  session.send(msg).endDialog();
};

export default debugDialog;