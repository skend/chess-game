var app = require('express')();
var http = require('http').createServer(app);
var io = require("socket.io")(http);
var uniqid = require('uniqid');

io.set("origins", "*:*");

let players = [];

app.get("/", function(req, res) {
  res.send("<h1>test</h1>");
});

io.on("connection", function(socket) {
  let joinInfo = onPlayerConnect();
  console.log("User connected. Join info: " + JSON.stringify(joinInfo));
  io.emit("player_join", joinInfo);
  console.log('There are ' + players.length + ' people currently connected.');

  if (players.length == 2) {
    io.emit("game_start");
  }

  socket.on("player_move", function(msg) {
    console.log("Move message received: " + JSON.stringify(msg));
    io.emit("player_move", msg);
  });

  socket.on("manual-disconnection", (data) => {
    console.log('Manual disconnection, removing ' + data + ' from the players array.');
    players.filter((value, index, arr) => {
      return value.id == data;
    });
  })

  socket.on("disconnect", function() {
    // TODO: disconnect behaviour
    players.length = 0;
    console.log("User disconnected (not manual).");
  });
});

http.listen(3000, function() {
  console.log("listening on *:3000");
});

function onPlayerConnect() {
  if (players.length == 2) {
    return { success: false, reason: 'Game is full.' }
  }
  else {
    let id = uniqid();
    players.push(id);
    return { success: true, id: id, color: players.length == 1 ? 'white' : 'black' }
  }
}