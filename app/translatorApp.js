var http = require('http');
var mysql = require('mysql');
var LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const { IamAuthenticator } = require('ibm-watson/auth');
var con = mysql.createConnection({host: "db", user: process.env.MYSQL_USER, password: process.env.MYSQL_PASSWORD, database: "ttranslate", insecureAuth: true});

function getUserSettings(telegram_id){
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT input, output FROM users WHERE telegram_id='"+telegram_id+"';", function (err, result, fields) {
      if (err) throw err;
      return {input: result[0].input, output: result[0].output};
    });
  });
}

function setUserInputLanguage(telegram_id, input){
  con.connect(function(err) {
    if (err) throw err;
    con.query("UPDATE users SET input='"+input+"' WHERE telegram_id='"+telegram_id+"';", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  });
}

function setUserOutputLanguage(telegram_id, output){
  con.connect(function(err) {
    if (err) throw err;
    con.query("UPDATE users SET output='"+output+"' WHERE telegram_id='"+telegram_id+"';", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  });
}

function translate(text, input, output, chat_id){
  var languageTranslator = new LanguageTranslatorV3({
  authenticator: new IamAuthenticator({ apikey: process.env.WATSON_API_KEY }),
  url: 'https://api.eu-de.language-translator.watson.cloud.ibm.com/instances/'+process.env.WATSON_INSTANCE,
  version: '2018-05-01',
});

languageTranslator.translate(
  {
    text: text,
    source: input,
    target: output
  })
  .then(response => {
    translated = response.result.translations[0].translation;
    sendMessage(chat_id, translated);
  })
  .catch(err => {
    console.log('error: ', err);
  });
}

function handleTranslationOrder(text, chat_id, telegram_id){
  userSettings = getUserSettings(telegram_id);
  translate(text, userSettings.input, userSettings.output, chat_id);
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
