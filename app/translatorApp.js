var http = require('http');
var mysql = require('mysql');

function getUserSettings(telegram_id){
  //return object with at least obj.input, obj.output
}

function setUserInputLanguage(telegram_id, input){
  //use languages.js to get input language before writing to db
}

function setUserOutputLanguage(telegram_id, output){
  //use languages.js to get input language before writing to db
}

function translate(text, input, output){
  //use translate.js to translate text
}

function handleTranslationOrder(text, chat_id, telegram_id){
  userSettings = getUserSettings(telegram_id);
  sendMessage(chat_id, translate(text, userSettings.input, serSettings.output));
}

function sendMessage(chat_id, message){
  var url = "https://api.telegram.org/bot"+process.env.TELEGRAM_BOT_TOKEN+"/sendmessage?text="+message+"&chat_id="+chat_id;
  https = require('https');
  https.get(url);
}

var server = http.createServer(function (request, response) {
  if(request.method === 'POST'){
    let body = '';
    request.on('data', chunk => {
      body += chunk.toString();
    });
    request.on('end', () => {
      try {
        var obj = JSON.parse(body);
        var text = obj.message.text.split(" ");
        var chatID = obj.message.chat.id;
        var userID = obj.message.from.id;
      } catch(err) {
        console.log('no JSON');
        response.end("ERR");
      }
        if(text[0] == "/echo"){
    message = text.join(text.shift());
    console.log(message);
    sendMessage(chatID, message);
        }else if(text[0] == "/input"){
          setUserInputLanguage(userID, text[1]);
        }else if(text[0] == "/output"){
          setUserOutputLanguage(userID, text[1]);
        }else{
          handleTranslationOrder(text.join(" "), chatID, userID);
        }
    });
  }
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("OK");
});

server.listen(443);
