function copyToClipboard(text) {
    window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
}

var socket = io.connect(window.location.origin);

var txtCopyLink = document.getElementById('txtCopyLink');
var btnCopyLink = document.getElementById('btnCopyLink');
var btnOutRoom = document.getElementById('btnOutRoom');
var currentRoom = document.getElementById('currentRoom');

btnCopyLink.addEventListener('click', () => {
    copyToClipboard(txtCopyLink.value);
});
btnOutRoom.addEventListener('click', () => {
    //->redirect->socket.disconnect->disconnect from room
    //->need to remove cookies

    if (window.confirm('Bạn muốn rời khỏi phòng?')) {
        eraseCookie("room");
        eraseCookie("link");
        location.href = "/";
    }

});

//check if join a room before:
if (getCookie("room") ){
    let room = getCookie("room");
    let link = getCookie("link");
    let create_room = getCookie("create-room");
    //if refresh page or something -> create-room to check if user has been in room before:
    console.log("create-room: "+(create_room === "true"));
    if(create_room === "true"){
        socket.emit('join-room', room);
    }
    else if (!link) {
        socket.emit('join-room', room);
    }
    else{
        socket.emit('create-room',{room: room, link: link});
    }
}
    //currently in some room:
    //-> display room
    //-> display link
    //-> go to socket and get number of user  

    //need to check if room still exist:
    //--> send request to server:
    
else {
    //alert you havent join a room
    //back to main page
    location.href = "/";
    eraseCookie("room");
    eraseCookie("link");
    eraseCookie("create");
}

//main page:
socket.on('join-room', val =>{
    if(val.status){ 
    currentRoom.innerText = val.room;
    txtCopyLink.value = val.link;
    }
    else{
        //if join room failed:
        //-> room not exist
        //----> if is creator -> create room again -> (check if link exist)
        //----> else back to main page 
        //-> room full
        //----> alert room full -> back to main page
        if(getCookie("link")){
            alert("Khởi tạo lại phòng...");
            socket.emit('create-room',{room : getCookie("room"), link: getCookie("link")});
           
        }
        else{
            alert("Vào phòng thất bại");
            eraseCookie("room");
            location.href = "/enter-room";
        }
    }
});
socket.on('create-room', val =>{
    if(val.status){
        alert("Tạo phòng thành công!");
        currentRoom.innerText = getCookie("room");
        txtCopyLink.value = getCookie("link");
        setCookie("create-room",true,1);
    }
    else{
        alert("Tạo phòng thất bại");
        eraseCookie("room");
        eraseCookie("link");
        eraseCookie("create-room");
        location.href = "/create-room";
    }
});