import * as builder from 'botbuilder';
import * as emoji from 'node-emoji';

import * as util from '../util';
import ssml from '../ssml';

let helpDialog = (session: builder.Session, args: any) => {
  let title = 'What can I do?';
  let description = '';
  let speech = new ssml();
  let commands = [ 
    'show me image of the day (from 5 days ago)', 
    'quiz (from yesterday)', 
    'about this bot', 
    'submit feedback'
  ];

  if (args && args.isFallback) {
    // Visiting as a fallback route
    title = 'I am sorry!';

    let msg = session.message && session.message.text;
    if (msg) {
      description += `I didn't understand what do you mean by :${util.br()}" *${msg}* "${util.br(2)}`;
      speech.s('I didn\'t understand what do you mean.');
    }
    else {
      description += `I didn't hear you ask anything.${util.br(2)}`;
      speech.s('I didn\'t hear you ask anything.');
    }
  }

  description += `**Try saying one of the following commands:**${util.br(2)}`;
  speech.s('Try saying one of the following commands:');

  commands.forEach((cmd) => {
    description += `- *${cmd}*${util.br()}`;

    speech.pause('250ms');
    speech.say(cmd);
  });

  let msg = new builder.Message(session)
      .text(util.formatCard(title, description))
      .speak(speech.ssml())
      .inputHint(builder.InputHint.acceptingInput);

  session.send(msg).endDialog();
};

export default helpDialog;