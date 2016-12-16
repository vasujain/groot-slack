/**
 * Groot Bot for Slack ! 
 * @author: Vasu Jain
 */

// Libraries
var BotConfig = require('./config.json');
var Botkit = require("botkit");

function onInstallation(bot, installer) {
    if (installer) {
        bot.startPrivateConversation({
            user: installer
        }, function(err, convo) {
            if (err) {
                console.log(err);
            } else {
                convo.say('Groot - just joined your team');
            }
        });
    }
}

var controller = Botkit.slackbot({
    debug: false
});

var slackTokenEncrypted = BotConfig.config.slack_token_encrypted;
var slackTokenBuf = new Buffer(slackTokenEncrypted, 'base64');
var token = slackTokenBuf.toString("ascii");

if (token) {
    console.log("Starting in single-team mode");
    controller.spawn({
        token: token
    }).startRTM(function(err, bot, payload) {
        console.log("Loaded config parameters from config.json ");
        if (err) {
            console.log(err);
            throw new Error(err);
        }
    });
} else {
    console.log("Slack token not found");
}

// Websocket connection to Slack
controller.on('rtm_open', function(bot) {
    console.log('** The RTM api just connected!');
});

controller.on('rtm_close', function(bot) {
    console.log('** The RTM api just closed');
});

/* ************************* SLACK BOT CONTROLLER ******************************** */
controller.on('bot_channel_join', function(bot, message) {
    bot.reply(message, "I am Groot !!");
});

controller.hears('(.*)', ['direct_mention', 'mention', 'direct_message'], function(bot, message) {
    bot.reply(message, {
        "attachments": [{
            "fallback": "I am Groot !!",
            "color": "#36a64f",
            "pretext": "I am Groot !!",
            "image_url": "https://images-na.ssl-images-amazon.com/images/I/71YEEBcNIpL._SL256_.jpg"
        }]
    });   
});