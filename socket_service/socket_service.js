let _io;

function listen(socket){
    let io = _io;
    socket.on('create-room',(room_id, link) =>{
        //chick if room is existed:
        let check = true;
        Object.keys(io.sockets.adapter.rooms).forEach(room =>{
            if(room === room_id){
                check = false;
                socket.emit('create-room',{status: false});
                return false;
            }
        });
        if(check){
            socket.join(room_id);
            io.sockets.adapter.rooms[room_id].link = link;
            socket.emit('create-room',{status: true});
        }
    });
    socket.on('join-room',(room)=>{
         //chick if room is existed:
         let check = true;
         Object.keys(io.sockets.adapter.rooms).forEach(_room =>{
             if(_room === room){
                 check = false;
                 socket.join(room);
                 socket.emit('join-room',{status: true});
                 return false;
             }
         });
         if(check){
             socket.join(room);
             socket.emit('create-room',{status: false});
         }
    });
    
}

module.exports = (io) =>{
    _io = io;
    return { listen }
}