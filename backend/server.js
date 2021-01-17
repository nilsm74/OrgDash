const { pathToFileURL } = require('url')

const express = require('express'),
app = express(),
http = require('http').Server(app),
io = require('socket.io')(http)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/test/socket_test.html')
    console.log('NEW HTTP CONNECTION')
})

io.on('connection', socket => {
    console.log("NEW CONNECTION")
    // Handle joining a room //
    socket.on('join', room => {
        // TODO: If room doesn't exist add to database, otherwise add them to existing room //
        console.log("room:" + room)
        socket.join(room)
    })
    // Handle chat messages //
    socket.on('chat', (room, msg, user) => {
        console.log(room)
        console.log(user + ": " + msg)
        io.to(room).emit('chat_msg', user + ": " + msg)
    })
})

http.listen(3000)