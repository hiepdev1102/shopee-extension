const express = require('express');
const router = express.Router();
let _io;

//Khong dung duoc socket tren route vs io.sockets.on('connection') khong trigger o day ma chi o server:

router.get('/', (req, res, next) => {
    console.log('run');
    let io = _io;
    console.log(io);
    
    const socket_service = require('../socket_service/socket_service')(io);

    io.sockets.on('connection', socket => {
        console.log("someone log in with id: " + socket.id);
        socket_service.listen(socket);
    });
    
    res.render('room');
});

module.exports = (io) =>{
    _io = io;
    return router;
}
