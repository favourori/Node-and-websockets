//socket connection

const socket = io.connect('http://localhost:3000/')

//dom

const message = document.getElementById('message')
const handle = document.getElementById('handle')
const output = document.getElementById('output')
const btn = document.getElementById('send')
const feedback = document.getElementById('feedback')

//emit events

btn.addEventListener('click', () => {
    socket.emit('chat', { message: message.value, handle: handle.value })
})

message.addEventListener('keypress', () => {
    socket.emit('typing', handle.value)
})

//listen for events

socket.on('chat', (data) => {
    feedback.innerHTML = ""
    output.innerHTML += `<p><strong> ${data.handle}:</strong> ${data.message}</p> `
})

socket.on('typing', (data) => {
feedback.innerHTML = `${data} is typing..`
})