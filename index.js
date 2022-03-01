let express = require('express');
let socket = require('socket.io');
let app = express();
let mysql = require('mysql');
let port = 3000;
let server = app.listen(port, () => {
    console.log(`Server running http::localhost:${port}`);
});

// setup mysql connection
let con = mysql.createConnection({
    database: "nodejs",
    host: "localhost",
    user: "root",
    password: '',
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    let createTable = "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY  AUTO_INCREMENT, user_name VARCHAR(255), password VARCHAR(255))";
    con.query(createTable, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });
});

app.use(express.static('public'));

// socket setup
let io = socket(server);
io.on('connection',function (socket){
    console.log(`socket connection id => ${socket.id}`);

    socket.on('chat', function (data){
        console.log(data);
        io.sockets.emit('chat',data);
    });

    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });
});