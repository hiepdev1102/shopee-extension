let _io;

function listen(socket){
    let io = _io;
    
    socket.on('create-room', val =>{
        console.log(val);
        //chick if room is existed:
        let check = true;
        console.log(Object.keys(io.sockets.adapter.rooms));
        Object.keys(io.sockets.adapter.rooms).forEach(room =>{
            console.log(room);
            console.log(val.room);
            console.log(val.room === room);
            console.log(val.room == room);
            if(val.room === room){
               
                check = false;
                socket.emit('create-room',{status: false});
                return false;
            }
        });
        if(check){
            //set currentRoom to client:
            socket.currentRoom = val.room;
            //join room:
            socket.join(val.room);
            //set room link:
            io.sockets.adapter.rooms[val.room].link = val.link;
            console.log("Before");
            console.log(Object.keys(io.sockets.adapter.rooms));
            console.log( io.sockets.adapter.rooms);
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
            socket.emit('join-room',{status: false});
         }
    });
    socket.on('disconnect', ()=>{
        socket.to(socket.currentRoom).emit('user-disconnect');
        console.log("after disconnect:");
        console.log(Object.keys(io.sockets.adapter.rooms));
    });
}

module.exports = (io) =>{
    _io = io;
    return { listen }
}