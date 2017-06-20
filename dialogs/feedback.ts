import * as builder from 'botbuilder';
import * as emoji from 'node-emoji';

import * as util from '../util';
import ssml from '../ssml';

let feedbackDialog = [
  (session: builder.Session) => {
      let title = 'Submit feedback';
      let description = `How would you rate your experience with this bot?`;

      let speech = new ssml();
      speech.say(description);

      builder.Prompts.text(session, util.formatCard(title, description), {
          speak: speech.ssml()
      });
  },
  (session: builder.Session, results: builder.IPromptTextResult) => {
      let res = results.response || '';

      // TODO: Upload feedback to the Azure Table Storage
      
      let title = 'Thank you!';
      let description = `Your feedback was recorded and will be reviewed in the soonest time.${util.br()}I appreciate you taking your time to improve this skill!`;
      
      let speech = new ssml();
      speech.say(description);

      let msg = new builder.Message(session)
          .text(util.formatCard(title, description))
          .speak(speech.ssml());

      session.send(msg).endDialog();
  }
];

export default feedbackDialog;