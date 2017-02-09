/**
 * Created by namlee on 2/8/2017.
 */
var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.render('index');
});

io.on('connection', (socket) => {
    socket.on('join', function (room) {
        socket.join(room);
    });

    socket.on('on', function (data) {
        io.to('' + data.currentRoom).emit('on', data);
    });
    socket.on('off', function (data) {
        io.to('' + data.currentRoom).emit('off', data);
    })
});


http.listen(3000);