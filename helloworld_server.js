var sanitizer = require('sanitizer');
var fs = require('fs');

var sendFile = function(filename, response) {
    fs.readFile(filename, function(err, data){
      response.writeHead(200, {'Content-Type':'text/html'});  
      response.write(data);  
      response.end();
    });
};

var server = require('http').createServer(function(req, response){
  if(req.url == "/") { 
    sendFile("helloworld.html", response);
  } else if (req.url == "/jquery.min.js") {
    sendFile("jquery.min.js", response); 
  } else {
    response.writeHead(302, {"Content-Type":"text/html", "Location":"/"});
    response.end();
  }
});

server.listen(8080);

var everyone = require("now").initialize(server);

everyone.connected(function(){
  console.log("Joined: " + this.now.name);
  everyone.now.loginNotice(this.now.name);
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
