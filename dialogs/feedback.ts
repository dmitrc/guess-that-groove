import * as builder from 'botbuilder';
import * as emoji from 'node-emoji';

import * as util from '../util';
var Speech = require('ssml-builder');

let feedbackDialog = [
  (session: builder.Session) => {
      let title = 'Submit feedback';
      let description = `How would you rate your experience with this bot?`;

      let speech = new Speech();
      speech.say('How would you rate your experience with this bot?');

      builder.Prompts.text(session, util.formatCard(title, description), {
          speak: util.ssml(speech)
      });
  },
  (session: builder.Session, results: builder.IPromptTextResult) => {
      let res = results.response || '';
      
      let title = 'Thank you!';
      let description = `Your feedback was recorded and will be reviewed in the soonest time.${util.br()}I appreciate you taking your time to improve this skill!`;

      let msg = new builder.Message(session)
          .text(util.formatCard(title, description));

      session.send(msg).endDialog();
  }
];

export default feedbackDialog;