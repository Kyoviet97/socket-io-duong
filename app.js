var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const port = process.env.PORT || 5000;

app.get('/', function (req, res) {
   res.sendFile(__dirname + '/index.html');
});

//Whenever someone connects this gets executed
io.on('connection', function (socket) {
   console.log('==================== A user connected');

   socket.on('message_client', function (data) {
      console.log("========================data: ", data)
      io.emit('message_server', data);
   });

   //Whenever someone disconnects this piece of code executed
   socket.on('disconnect', function () {
      console.log('A user disconnected');
   });
});


http.listen(port, function () {
   console.log('listening on *:5000');
});