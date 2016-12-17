/**
 * Groot Bot oAuth Library for Slack ! 
 * @author: Vasu Jain
 */

// Documentation @ https://api.slack.com/docs/slack-button

// if the oAuth request was accepted, the URL will contain a temporary code in a GET code parameter , 
// as well as the state you provided in the previous step in a state parameter
// state -- unique string to be passed back upon completion
// States should match here.


// exchange the code for an access token using the oauth.access method. 

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

function handleGetCalls() {
    
}


