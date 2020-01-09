function getCookieValue(a) {
    var b = document.cookie.match('(^|[^;]+)\\s*' + a + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
}
function delete_cookie(name) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
function copyToClipboard(text) {
    window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
}

var socket = io.connect(window.location.origin);

var txtCopyLink = document.getElementById('txtCopyLink');
var btnCopyLink = document.getElementById('btnCopyLink');
var btnOutRoom = document.getElementById('btnOutRoom');
var currentRoom = document.getElementById('currentRoom');

btnCopyLink.addEventListener('click', ()=>{
    copyToClipboard(txtCopyLink.value);
});
btnOutRoom.addEventListener('click', ()=>{
    //->redirect->socket.disconnect->disconnect from room
    //->need to remove cookies

    if(window.confirm('Bạn muốn rời khỏi phòng?')){
        location.href = "/";
    }

});

//check if join a room before:
if(getCookieValue("room")){
    let room = getCookieValue("room");
    let link = getCookieValue("link");
    //currently in some room:
    //-> display room
    //-> display link
    //-> go to socket and get number of user  

    //need to check if room still exist:
    //--> send request to server:
    var xhttp = new XMLHttpRequest() || ActiveXObject("Microsoft.XMLHTTP");

    xhttp.onreadystatechange =function() {
        if(this.readyState == 4 && this.status == 200){
            //--> server send back 
            
            if(this.room_exist){
                currentRoom.innerText = room;
                txtCopyLink.value = link;
                socket.emit('join-room', room);
            }
        }
    }
    xhttp.open('GET', 'check-room?room='+room, true);
    xhttp.send();

}
else{
    //alert you havent join a room
    //back to main page
}

//main page:
