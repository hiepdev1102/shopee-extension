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
if (getCookie("room")) {
    let room = getCookie("room");
    console.log(room);
    let link = getCookie("link");
    console.log(link);
    if (!room) {
        //->redirect to main page:
        location.href = "/";
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
}

//main page:
socket.on('join-room', val =>{
    if(val.status){ 
    currentRoom.innerText = val.room;
    txtCopyLink.value = val.link;
    }
    else{
        alert("Vào phòng thất bại");
        location.href = "/enter-room";
    }
});
socket.on('create-room', val =>{
    if(val.status){
        alert("Tạo phòng thành công!");
        currentRoom.innerText = getCookie("room");
        txtCopyLink.value = getCookie("link");
    
    }
    else{
        alert("Tạo phòng thất bại");
        eraseCookie("room");
        eraseCookie("link");
        location.href = "/create-room";
    }
});