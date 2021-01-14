const axios = require("axios")
const crypto = require("crypto")

// some constants
const BaseURL = "https://api-sugaroid.herokuapp.com";
const BaseBackendURL = `${BaseURL}/chatbot`;


exports.sendUserMessageGetResponse = function (response, chatId, callback) {
    /* Sends reply to the Sugaroid bot  */

    if (response.trim() == "") {
        // if string is empty, don't send it to server
        // for processing.
        return false;
    }

    // get the uniqueId from chatId
    var chatIdHash = crypto.createHash('sha1');
    chatIdHash.update(`${chatId}`);
    var uuid = chatIdHash.digest('hex');
    var callbackEndpointURL = `${BaseBackendURL}?uuid=${uuid}`;

    console.log(`--> Calling ${callbackEndpointURL}`);
    // send the POST request to BaseBackendURL
    axios.post(
        callbackEndpointURL, 
        {
            "message": response
        }
    ).then(
        function(data) {
            callback(chatId, data['data']['message']);
        }
    ).catch(
        function(err){
            callback(chatId, `Oops. I guess my brain just exploded! 🤯.${err}`);
            console.log(`@sugaroid :: ERR <-> ${err}`);
        }
    );
    console.log(`@sugaroid :: ${uuid} ==> ${response}`);
};
