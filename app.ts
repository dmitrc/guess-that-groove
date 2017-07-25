import * as dotenv from 'dotenv-extended';
import * as builder from 'botbuilder';
import * as restify from 'restify';

import debugDialog from './dialogs/debug';
import helpDialog from './dialogs/help';
import aboutDialog from './dialogs/about';
import feedbackDialog from './dialogs/feedback';

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

var bot = new builder.UniversalBot(connector, (session) => {
    session.replaceDialog('HelpDialog', { isFallback: true });
});

// var recognizer = new builder.LuisRecognizer(process.env.LUIS_MODEL_URL);
// bot.recognizer(recognizer);

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