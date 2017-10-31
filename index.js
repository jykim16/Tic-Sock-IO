var express = require('express');
var bodyParser = require('body-parser');
var db = require('./db');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

io.on('connection', socket => {

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('createGame', (data)=> {
    db.createGame(data.username, socket)
      .then(joined => {
        socket.join(joined.gameToken, ()=> {
          io.to(joined.gameToken).emit('toggleGameBoard');
          io.to(joined.gameToken).emit('joinCode', joined.gameToken);
          io.to(joined.gameToken).emit('updateState', joined);
        });
      })
      .catch(err => {console.log(err)})
  });

  socket.on('joinGame', (data)=> {
    db.joinGame(data.username, data.gameToken, socket)
      .then(joined => {
        socket.join(data.gameToken, ()=> {
          io.to(socket.id).emit('toggleGameBoard');
          io.to(data.gameToken).emit('updateState', joined);
        });
      })
      .catch(err=> {
        if(err==='not code') {
          //(db) check code if matching game does not exist => return alert
          io.to(socket.id).emit('alert', {msg: 'This code does not exist. Create a new game or supply another code'})
        } else if (err==='not player'){
          //(db) check code, if game contains 2 players and 1 is not the username given => return alert
          io.to(socket.id).emit('alert', {msg: 'this game is already full. Create a new game or supply another code'})
        }
      })
  });

  socket.on('turnToDb', (data)=>{
    db.updateDb(data.gameToken, data).
    then(updated => {
      io.to(data.gameToken).emit('updateState', updated)
    })
  });

});

app.use(express.static(__dirname + '/client/dist'));

app.get('/items', function (req, res) {
  db.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

server.listen((process.env.PORT || 3000), function() {
  console.log('listening on port 3000!');
});
