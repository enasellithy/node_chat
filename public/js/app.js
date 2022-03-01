let chatWindow = document.getElementById('chat-window');
let output = document.getElementById('output');
let message = document.getElementById('message');
let btn = document.getElementById('send');
let handle = document.getElementById('handle');
let feedback = document.getElementById('feedback');

// Make Connection
let socket = io.connect('http://localhost:3000');

btn.addEventListener('click',function (){
    socket.emit('chat',{
        message:message.value,
        handle: handle.value
    });
});

message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
})

// listen to events
socket.on('chat', function (data){
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing',function (data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});