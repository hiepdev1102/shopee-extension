const express = require('express');
const path = require('path');
const http = require('http');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, './public')));

//routes:
const routes = require('./routes/routes');
app.use('/', routes);


const server = http.Server(app);
const io = require('socket.io')(server);
const socket_service = require('./socket_service/socket_service')(io);

io.sockets.on('connection', socket =>{
    console.log("someone log in with id: "+socket.id);
    socket_service.listen(socket);
});

let port = process.env.PORT || 3000;

server.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});