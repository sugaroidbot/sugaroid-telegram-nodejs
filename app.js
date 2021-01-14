const TelegramBot = require('node-telegram-bot-api');
const SugaroidBot = require('./core.js')


// load environment variables.
require('dotenv').config()

const token = process.env.SUGAROID_TG_TOKEN;


// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});


function sendMessage(chatId, message) {
  console.log(`@sugaroid :: ${chatId} ==> ${message}`);
  bot.sendMessage(chatId, message);
}


bot.onText(/\@sugaroidbot (.+)/, (msg, match) => {
  // called when sugaroidbot receives a message.

  const chatId = msg.chat.id;
  const resp = match[1];

  // send typing signal as Sugaroid would take 
  // some time to process the information
  bot.sendChatAction(chatId, 'typing')
  .then(function() {
    SugaroidBot.sendUserMessageGetResponse(resp, chatId, sendMessage)
  })

});
