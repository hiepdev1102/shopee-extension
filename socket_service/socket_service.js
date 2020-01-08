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
            //set currentRoom to client:
            socket.currentRoom = room_id;
            //join room:
            socket.join(room_id);
            //set room link:
            io.sockets.adapter.rooms[room_id].link = link;
            //emit create room status:
            socket.emit('create-room',{status: true});
        }
    });
    
    socket.on('join-room',(room)=>{
         //chick if room is existed:
         let check = true;
         Object.keys(io.sockets.adapter.rooms).forEach(_room =>{
             if(_room === room){
                 check = false;
                 //add currentRoom;
                 socket.currentRoom = room;
                 //join actual room:
                 socket.join(room);
                 //get room link:
                 let link = io.sockets.adapter.rooms[room].link;
                 //send it back to client:
                 socket.emit('join-room',{status: true, link: link, room: room});
                 return false;
             }
         });
         if(check){
            socket.emit('create-room',{status: false});
         }
    });
    socket.on('disconnect', ()=>{
        socket.to(socket.currentRoom).emit('user-disconnect');
    });
}

module.exports = (io) =>{
    _io = io;
    return { listen }
}