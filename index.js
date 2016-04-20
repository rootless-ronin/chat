var app = require("express")();
var express = require("express");
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.use('/static', express.static('public'));
app.get("/", function(req, res){
	res.sendFile(__dirname + "/public/index.html");
});

io.on("connection", function(socket){
	socket.on("echo request", function(msg){
		console.log(msg);
		io.emit("echo response", msg);

	});
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});