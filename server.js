const express = require('express');
const session = require('express-session');
const path = require('path');
const http = require('http');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());



app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, './public')));



const server = http.Server(app);
const io = require('socket.io')(server);

const socket_service = require('./socket_service/socket_service')(io);

io.sockets.on('connection', socket => {
    console.log("someone log in with id: " + socket.id);
    socket_service.listen(socket);
});


//routes:
const routes = require('./routes/routes')(io);

//const testRoutes = require('./routes/test-routes')(io);

app.use('/', routes);
//app.use('/test', testRoutes);

let port = process.env.PORT || 3000;

server.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});