import * as dotenv from 'dotenv-extended';
import * as builder from 'botbuilder';
import * as restify from 'restify';

import debugDialog from './dialogs/debug';
import gameDialog from './dialogs/game';
import roundDialog from './dialogs/round';
import hintDialog from './dialogs/hint';
import helpDialog from './dialogs/help';
import aboutDialog from './dialogs/about';
import feedbackDialog from './dialogs/feedback';

import r from './resources/misc';
import * as util from './util';
import * as serverFunc from './server';

dotenv.load();

var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
    console.log(`${server.name} listening to ${server.url}`);
});

var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

server.post('/api/messages', connector.listen());

server.get('/api/song', serverFunc.getSong);

server.use(restify.bodyParser());
server.post('/api/results', serverFunc.postGameResults);

server.get('/api/leaderboard/:game_id', serverFunc.getTopNPlayers);

var bot = new builder.UniversalBot(connector, (session) => {
    session.replaceDialog('GameDialog');
});

// var recognizer = new builder.LuisRecognizer(process.env.LUIS_MODEL_URL);
// bot.recognizer(recognizer);

let cancelMsg = new builder.Message()
    .text(util.formatCard(r.cancel.title, r.cancel.description))
    .speak(r.cancel.speech)
    .inputHint(builder.InputHint.ignoringInput);

let confirmMsg = new builder.Message()
    .text(util.formatCard(r.confirm.title, r.confirm.description))
    .speak(r.confirm.speech)
    .inputHint(builder.InputHint.ignoringInput);

bot.dialog('GameDialog', gameDialog)
.endConversationAction('endConversationAction', cancelMsg, {
    matches: [
        /exit/i,
        /cancel/i,
        /goodbye/i
    ],
    confirmPrompt: confirmMsg
});

let repeatMsg = new builder.Message()
    .text(r.repeat.description)
    .speak(r.repeat.speech)
    .inputHint(builder.InputHint.ignoringInput);

bot.dialog('RoundDialog', roundDialog)
.reloadAction('reloadAction', repeatMsg, {
    matches: [
        /repeat/i, /* MIGHT CAUSE CONFLICTS WITH CORTANA'S INNER WORKINGS, NOT RECOMMENDED */
        /excuse me/i,
        /(try|play|say)+.*again/i,
        /(try|play|say)+.*one more time/i
    ]
});

bot.dialog('HintDialog', hintDialog)
.triggerAction({
    matches: [
        /hint/i,
        /clue/i
    ],
    onSelectAction: (session, args, next) => {
        // Add the hint dialog to the dialog stack 
        // (override the default behavior of replacing the stack)
        let dialog = (args && args.action) || 'HintDialog';
        session.beginDialog(dialog, args);
    }
});

bot.dialog('HelpDialog', helpDialog)
.triggerAction({
    matches: [
        /what can i do/i
    ]
});

bot.dialog('AboutDialog', aboutDialog)
.triggerAction({
    matches: [
        /about this/i,
        /who created/i
    ]
});

bot.dialog('FeedbackDialog', feedbackDialog)
.triggerAction({
    matches: [
        /leave feedback/i,
        /leave review/i
    ]
});

bot.dialog('DebugDialog', debugDialog)
.triggerAction({
    matches: [
        /follow the white rabbit/i
    ]
});