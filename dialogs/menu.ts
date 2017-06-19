import * as builder from 'botbuilder';
import * as emoji from 'node-emoji';

import * as util from '../util';
var Speech = require('ssml-builder');

let menuDialog = new builder.IntentDialog()
.onDefault((session) => {
  var title = 'Main menu';
  var description = `Welcome to **Skill**!${util.br(2)}`;

  var speech = new Speech();
  speech.say('Welcome to');
  speech.prosody({ volume: 'loud', rate: 'slow' }, 'Skill.');
  speech.say('Say "start" to begin right away or choose one of the following options:');
  speech.pause('100ms');
  speech.say('"about this bot"');
  speech.pause('100ms');
  speech.say('"submit feedback"');

  var card = new builder.HeroCard(session)
      .buttons([
          builder.CardAction.imBack(session, 'start', 'Start'),
          builder.CardAction.imBack(session, 'about', 'About this bot'),
          builder.CardAction.imBack(session, 'feedback', 'Submit feedback')
      ]);

  var msg = new builder.Message(session)
      .text(util.formatCard(title, description))
      .addAttachment(card)
      .speak(util.ssml(speech))
      .inputHint(builder.InputHint.acceptingInput);

  session.send(msg).endDialog();
});

export default menuDialog;