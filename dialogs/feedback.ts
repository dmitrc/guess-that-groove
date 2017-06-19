import * as builder from 'botbuilder';
import * as emoji from 'node-emoji';

import * as util from '../util';
var Speech = require('ssml-builder');

let feedbackDialog = [
  (session: builder.Session) => {
      let title = 'Submit feedback';
      let description = `How would you rate your experience with this bot?${util.br(2)}${emoji.get('star')} - Terrible${util.br()}${emoji.get('star')}${emoji.get('star')} - Poor${util.br()}${emoji.get('star')}${emoji.get('star')}${emoji.get('star')} - Average${util.br()}${emoji.get('star')}${emoji.get('star')}${emoji.get('star')}${emoji.get('star')} - Great${util.br()}${emoji.get('star')}${emoji.get('star')}${emoji.get('star')}${emoji.get('star')}${emoji.get('star')} - Excellent`;

      builder.Prompts.text(session, util.formatCard(title, description));
  },
  (session: builder.Session, results: builder.IDialogResult<any>) => {
      let res = results.response || '';
      
      let title = 'Thank you!';
      let description = `Your feedback was recorded. I want you to know this means a lot to me and I will review every single one in the soonest time.${util.br(2)}Would you like to leave an additional comment?`;


      builder.Prompts.text(session, util.formatCard(title, description));
  },
  (session: builder.Session, results: builder.IPromptTextResult) => {
      let res = results.response || '';

      if (res.search(util.yesRegex) >= 0) {
          builder.Prompts.text(session, 'Please respond with the additional comment, that you would like to include in your review:');
      }
      else {
          session.endDialog();
      }
  },
  (session: builder.Session, results: builder.IPromptTextResult) => {
      let res = results.response || '';
      
      let title = 'Thank you!';
      let description = `Your comment was added to your review. I appreciate you taking your time to provide detailed feedback!`;

      let msg = new builder.Message(session)
          .text(util.formatCard(title, description));

      session.send(msg).endDialog();
  }
];

export default feedbackDialog;