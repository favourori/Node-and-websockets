const express = require('express')
const app = express()
const socket = require('socket.io')
//serve static files
app.use(express.static('public'))


//spin up the server
let port = process.env.PORT || 3000
let server = app.listen(port, () => {
    console.log("Server is up & Running..")
})


//socket setup
const io = socket(server)
io.on("connection", (socket) => {
    console.log("Made socket connection", socket.id)
    socket.on('chat', (data) => {
        io.sockets.emit('chat', data)
    })

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data)
    })
})


