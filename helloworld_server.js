var sanitizer = require('sanitizer');
var fs = require('fs');
var server = require('http').createServer(function(req, response){
  fs.readFile('helloworld.html', function(err, data){
    response.writeHead(200, {'Content-Type':'text/html'});  
    response.write(data);  
    response.end();
  });
});
server.listen(8080, "127.0.0.1");
var everyone = require("now").initialize(server);


everyone.connected(function(){
  console.log("Joined: " + this.now.name);
});


everyone.disconnected(function(){
  console.log("Left: " + this.now.name);
});

everyone.now.distributeMessage = function(message){
	console.log(this.now.name+ " : "+message);
	var name = this.now.name;
	name = "("+sanitizer.escape(name)+")";
	message = sanitizer.escape(message);

	everyone.now.receiveMessage(name, message);
};
