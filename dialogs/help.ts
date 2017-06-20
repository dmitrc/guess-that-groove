import * as builder from 'botbuilder';
import * as emoji from 'node-emoji';

import * as util from '../util';
var Speech = require('ssml-builder');

let helpDialog = (session: builder.Session, args: any) => {
  let title = 'What can I do?';
  let description = '';
  let speech = new Speech();
  let commands = [ 
    'show me image of the day (from 5 days ago)', 
    'play quiz (from yesterday)', 
    'about this bot', 
    'submit feedback'
  ];

  if (args && args.isFallback) {
    // Visiting as a fallback route
    title = 'I am sorry!';

    let msg = session.message && session.message.text;
    if (msg) {
      description += `I didn't understand what do you mean by :${util.br()}" *${msg}* "${util.br(2)}`;
      speech.sentence('I didn\'t understand what do you mean.');
    }
    else {
      description += `I didn't hear you ask anything.${util.br(2)}`;
      speech.sentence('I didn\'t hear you ask anything.');
    }
  }

  description += `**Try saying one of the following commands:**${util.br(2)}`;
  speech.sentence('Try saying one of the following commands:');

  commands.forEach((cmd) => {
    description += `- *${cmd}*${util.br()}`;

    speech.pause('100ms');
    speech.say(cmd);
  });

  let msg = new builder.Message(session)
      .text(util.formatCard(title, description))
      .speak(util.ssml(speech))
      .inputHint(builder.InputHint.acceptingInput);

  session.send(msg).endDialog();
};

export default helpDialog;