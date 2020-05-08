var http = require('http');

var server = http.createServer(function (request, response) {
	if(request.method === 'POST'){
		let body = '';
		request.on('data', chunk => {
			body += chunk.toString();
		});
		request.on('end', () => {
			try {
				var obj = JSON.parse(body);
				console.log(obj.message.text);
			} catch(err) {
				console.log('no JSON');
			}
		});
	}
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.end("OK");
});

server.listen(443);
