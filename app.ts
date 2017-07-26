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

import { speech, title, text } from './strings/test';

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

server.post('/answer', serverFunc.giveAnswer);

server.get('/leaderboard', serverFunc.getLeaderboard);

var bot = new builder.UniversalBot(connector, (session) => {
    //session.replaceDialog('HelpDialog', { isFallback: true });
    session.replaceDialog('DebugDialog');
});

// var recognizer = new builder.LuisRecognizer(process.env.LUIS_MODEL_URL);
// bot.recognizer(recognizer);
let cancelMsg = new builder.Message()
    .text('Exiting the game...')
    .speak('Exiting the game')
    .inputHint(builder.InputHint.ignoringInput);

let confirmMsg = new builder.Message()
    .text('This will cancel your current progress. Are you sure?')
    .speak('This will cancel your current progress. Are you sure?')
    .inputHint(builder.InputHint.ignoringInput);

bot.dialog('GameDialog', gameDialog)
.triggerAction({
    matches: [
        /game/i
    ]
})
.endConversationAction('endConversationAction', cancelMsg, {
    matches: [
        /exit/i,
        /cancel/i,
        /goodbye/i
    ],
    confirmPrompt: confirmMsg
});

let repeatMsg = new builder.Message()
    .text(text.Repeat)
    .speak(speech.Repeat)
    .inputHint(builder.InputHint.ignoringInput);

bot.dialog('RoundDialog', roundDialog)
.reloadAction('reloadAction', repeatMsg, {
    matches: [
        /repeat/i,
        /restart/i,
        /start over/i,
        /try again/i
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
        /help/i,
        /commands/i
    ]
});

bot.dialog('AboutDialog', aboutDialog)
.triggerAction({
    matches: [
        /about this/i,
        /author/i,
        /contact/i,
        /created/i
    ]
});

bot.dialog('FeedbackDialog', feedbackDialog)
.triggerAction({
    matches: [
        /feedback/i,
        /review/i
    ]
});

bot.dialog('DebugDialog', debugDialog)
.triggerAction({
    matches: [
        /debug/i
    ]
});