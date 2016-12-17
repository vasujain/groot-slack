/**
 * Groot Bot oAuth Library for Slack ! 
 * @author: Vasu Jain
 */

// Documentation @ https://api.slack.com/docs/slack-button
// sample JSON response for oAuth call:
/*
    {
        "access_token": "xoxp-XXXXXXXX-XXXXXXXX-XXXXX",         //for other integration points.
        "scope": "incoming-webhook,commands,bot",
        "team_name": "Team Installing Your Hook",
        "team_id": "XXXXXXXXXX",
        "incoming_webhook": {
            "url": "https://hooks.slack.com/TXXXXX/BXXXXX/XXXXXXXXXX",
            "channel": "#channel-it-will-post-to",
            "configuration_url": "https://teamname.slack.com/services/BXXXXX"
        },
        "bot":{     // used when you are acting on behalf of that bot user for that team context
            "bot_user_id":"UTTTTTTTTTTR",                   
            "bot_access_token":"xoxb-XXXXXXXXXXXX-TTTTTTTTTTTTTT"
        }
    }
*/


var BotConfig = require('./config.json');

var authCode = extractSlackCode("code");
slackTokenIssuerCall(authCode);

// This call is already being made by Slack Button
function slackAuthUrl() {
    var authUrl = BotConfig.slack.oauth_authorize_url 
      + "?client_id=" + BotConfig.slack.client_id 
      + "&scope=" + BotConfig.slack.scope 
      + "&redirect_uri=" + BotConfig.slack.redirect_uri 
      + "&team=" + BotConfig.slack.team 
      + "&state=" + BotConfig.slack.state;
    window.location = authUrl;
}

function extractSlackCode(parameterName) {
   //https://APP_NAME.herokuapp.com/oauth.js?code=XXXX&state=
    var result = null, tmp = [];
    location.search.substr(1).split("&").forEach(function (item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) 
                result = decodeURIComponent(tmp[1]);
    });
    return result;
}

function slackTokenIssuerCall(auth_code) {
    // Request: https://slack.com/api/oauth.access?client_id=XXXX&client_secret=XXXX&code=XXXX&pretty=1
    
    var http = require("https");
    var path = "/api/oauth.access" 
        + "?client_id=" + BotConfig.slack.client_id
        + "&client_secret=" + BotConfig.slack.client_secret 
        + "&code=" + auth_code;

    var options = {
      "method": "GET",
      "hostname": "slack.com",
      "port": null,
      "path": path
    };

    var req = http.request(options, function (res) {
      var chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function () {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
      });
    });

    req.end();
}