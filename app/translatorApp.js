var http = require('http');

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
			} catch(err) {
				console.log('no JSON');
				response.end("ERR");
			}
        if(text[0] == "/echo"){
		message = text.join(text.shift());
		console.log(message);
		sendMessage(chatID, message);
        }
		});
	}
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.end("OK");
});

server.listen(443);
